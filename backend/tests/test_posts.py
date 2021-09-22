# core to testing
from typing import Callable, List

from sqlalchemy.sql.expression import update
import pytest
from httpx import AsyncClient
from fastapi import FastAPI, status
from databases import Database


# db repositories
from app.db.repositories.posts import PostsRepository

# models
from app.models.post import PostCreate, PostInDB, PostPublic, PostUpdate
from app.models.user import UserInDB

# services

# decorates all tests with this mark ( @pytest.mark.asyncio
pytestmark = pytest.mark.asyncio


# testing follows pretty common pattern:

# testroutes exist
# testroutes inputs fail correctly
# test actions with various client authorisations
# e.g. logged in, not logged in, allowed,not allowed -> get/create/delete/etc


@pytest.fixture
async def new_post():
    """
    A fixture to create and return a new 'PostCreate' object.
    """

    test_data = {
        "title": "test_title",
        "short_desc": "test_sd",
        "long_desc": "test_LD",
        "location": "test_loc",
    }

    return PostCreate(**test_data)


class TestPostRoutes:
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        # request
        res = await client.get(app.url_path_for("posts:list-posts"))
        # response
        assert res.status_code != status.HTTP_404_NOT_FOUND

        res = await client.get(app.url_path_for("posts:create-post"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

        res = await client.get(app.url_path_for("posts:update-post-by-id", post_id=1))
        assert res.status_code != status.HTTP_404_NOT_FOUND
        assert res.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

        res = await client.get(app.url_path_for("posts:delete-post-by-id", post_id=1))
        assert res.status_code != status.HTTP_404_NOT_FOUND
        assert res.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

        # repeat for all other endpoints
        # res = await client.get(app.url_path_for("posts:update-post"))
        # res = await client.get(app.url_path_for("posts:delete-post"))
        # res = await client.get(app.url_path_for("posts:"))


class TestCreatePost:
    async def test_unauthorised_user_cannot_create(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_user_auth_client: AsyncClient,
        new_post: PostCreate,
    ) -> None:
        """
        If no authentication/access token is provided, create should return unauthorized.
        """
        # client is not authenticated
        res = await client.post(
            app.url_path_for("posts:create-post"),
            json={"new_post": new_post.dict()},
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

        # authenticated but not an org
        res = await client.post(
            app.url_path_for("posts:create-post"),
            json={"new_post": new_post.dict()},
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_valid_input_creates_post(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org1: UserInDB,
        new_post: PostCreate,
    ) -> None:
        """
        test_org1 is logged in and attempts to create a post.

        not paramaterized.
        """

        ac = create_auth_client(user=test_org1)

        res = await ac.post(
            app.url_path_for("posts:create-post"),
            json={"new_post": new_post.dict()},
        )

        created_post = PostPublic(**res.json())

        assert res.status_code == 201
        assert created_post.title == new_post.title
        assert created_post.org_id == test_org1.id

    async def test_valid_input_creates_post_belonging_to_org(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org1: UserInDB,  # will be changed to an org user
        new_post: PostCreate,
    ) -> None:
        """
        Only an org should be able to create a post.
        """
        org_user = test_org1  #

        # create authorised client with user's credentials
        ac = create_auth_client(user=org_user)
        res = await ac.post(
            app.url_path_for("posts:create-post"),
            json={"new_post": new_post.dict()},
        )

        # post new_post data to the route
        res = await ac.post(
            app.url_path_for("posts:create-post"),
            json={"new_post": new_post.dict()},
        )
        assert res.status_code is not status.HTTP_401_UNAUTHORIZED
        assert res.status_code == status.HTTP_201_CREATED

        created_post = PostPublic(**res.json())
        assert created_post.title == new_post.title
        assert created_post.short_desc == new_post.short_desc
        assert created_post.long_desc == new_post.long_desc
        assert created_post.location == new_post.location
        assert created_post.org_id == org_user.id


class TestReadPost:
    """
    This class exists to test functionality for listing posts. E.g. expect 3, return 3, created posts exist in list etc.
    """

    async def test_UNIMPLEMENTED_created_posts_are_returned(
        self,
        app: FastAPI,
        create_auth_client: Callable,
    ) -> None:
        pass


class TestUpdatePost:
    async def test_update_unowned_post(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org3: UserInDB,  # org_user
        org1_test_post: PostInDB,  # unowned post
    ) -> None:
        """
        Can't update other's posts.
        """

        # create client as org3
        o3_ac = create_auth_client(user=test_org3)

        # create json for the request
        update = PostUpdate(title="title updated")
        valid_payload = update.json()

        # send the post_id as a path paramater in request
        res = await o3_ac.put(
            app.url_path_for(
                "posts:update-post-by-id",
                post_id=org1_test_post.id,
            ),
            json=valid_payload,
        )

        # assert forbidden (not the owner of that post)
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_owned_post(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org1: UserInDB,  # org_user
        org1_test_post: PostInDB,  # already exists - owned by org
    ) -> None:
        """
        Only the organisation that created a post should be able to update it.
        """

        ac = create_auth_client(user=test_org1)
        valid_payload = {"post_update": {"short_desc": "short_updated"}}

        res = await ac.put(
            app.url_path_for(
                "posts:update-post-by-id",
                post_id=org1_test_post.id,
            ),
            json=valid_payload,
        )

        assert res.status_code == status.HTTP_200_OK

        # convert json response to a model
        updated_post = PostInDB(**res.json())
        assert updated_post.id == org1_test_post.id  # same post

        # assert value changed
        assert getattr(updated_post, "short_desc") != getattr(
            org1_test_post, "short_desc"
        )
        assert getattr(updated_post, "short_desc") == "short_updated"

    # paramaters for test
    @pytest.mark.parametrize(
        "attrs_to_change, vals",
        (
            (["title"], ["updated title"]),
            (["short_desc"], ["updated short"]),
            (["long_desc"], ["updated long"]),
            (["is_published"], [False]),  # unpublish (default True)
            (["location"], ["updated location"]),
            (["image"], ["update image"]),
            (  # multiple values changing
                ["title", "short_desc", "image"],  # attr
                ["new title", "new short desc", "new image"],  # vals
            ),
        ),
    )
    async def test_update_post_with_valid_input(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org1: UserInDB,
        org1_test_post: PostInDB,
        attrs_to_change: List[str],
        vals: List[str],
    ) -> None:
        """
        Paramatereized test with assorted valid inputs for a given post owned by test_org1
        """
        # client
        ac = create_auth_client(user=test_org1)
        # generate json using dict comprehension
        valid_payload = {
            "post_update": {
                attrs_to_change[i]: vals[i] for i in range(len(attrs_to_change))
            }
        }

        # hit route with payload
        res = await ac.put(
            app.url_path_for(
                "posts:update-post-by-id",
                post_id=org1_test_post.id,
            ),
            json=valid_payload,
        )

        assert res.status_code == status.HTTP_200_OK

        # convert json response to a model
        updated_post = PostInDB(**res.json())
        assert updated_post.id == org1_test_post.id  # same post

        # assert values changed and expected val
        for i in range(len(attrs_to_change)):
            # assert changed
            assert getattr(updated_post, attrs_to_change[i]) != getattr(
                org1_test_post, attrs_to_change[i]
            )
            # assert expected value
            assert getattr(updated_post, attrs_to_change[i]) == vals[i]

        # assert only expected changed
        for attr, val in updated_post.dict().items():
            if attr not in attrs_to_change and attr != "updated_at":
                assert getattr(org1_test_post, attr) == val

    # paramaters for test TODO: - make fail with invalid values
    @pytest.mark.parametrize(
        "attrs_to_change, vals, status_code",
        (
            (["title"], ["something invalid"], [400]),
            # (  # multiple values changing
            #     ["title", "short_desc", "image"],  # attr
            #     ["new title", "new short desc", "invalid image"],  # vals
            #     [400],
            # ),
        ),
    )
    async def test_UNIMPLEMENTED_update_post_with_invalid_input_fails(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org1: UserInDB,
        org1_test_post: PostInDB,
        attrs_to_change: List[str],
        vals: List[str],
        status_code: int,
    ) -> None:
        """
        Paramaterized test for a post owned by test_org1

        TODO: invalid inputs and expected codes
        """
        pass
        # # client
        # ac = create_auth_client(user=test_org1)
        # # generate json using dict comprehension
        # invalid_payload = {
        #     "post_update": {
        #         attrs_to_change[i]: vals[i] for i in range(len(attrs_to_change))
        #     }
        # }

        # # hit route with payload
        # res = await ac.put(
        #     app.url_path_for(
        #         "posts:update-post-by-id",
        #         post_id=org1_test_post.id,
        #     ),
        #     json=invalid_payload,
        # )

        # # assert res.status_code == status_code

        # # updated_post = posts_repo.get_post_by_id(org1_test_post)

        # # # assert no changes made
        # # for attr, val in updated_post.dict().items():
        # #     if attr in attrs_to_change:
        # #         assert getattr(org1_test_post, attr) != val


class TestDeletePost:
    async def test_delete_unowned_post(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org2: UserInDB,
        org1_test_post: PostInDB,  # org1 owned post
        db: Database,
    ) -> None:
        """
        Can't delete other's posts.
        """

        ac = create_auth_client(user=test_org2)
        posts_repo = PostsRepository(db)

        res = await ac.delete(
            app.url_path_for(
                "posts:delete-post-by-id",
                post_id=org1_test_post.id,
            )
        )

        assert res.status_code == status.HTTP_403_FORBIDDEN

        # validate still in db
        post_in_db = await posts_repo.get_post_by_id(
            post_id=org1_test_post.id, requesting_user=None
        )

        assert post_in_db is not None

    async def test_delete_own_post(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_org1: UserInDB,
        org1_test_post: PostInDB,
        db: Database,
    ) -> None:
        """
        Only the organisation that created a post should be able to delete it.
        """

        ac = create_auth_client(user=test_org1)
        posts_repo = PostsRepository(db)

        res = await ac.delete(
            app.url_path_for(
                "posts:delete-post-by-id",
                post_id=org1_test_post.id,
            )
        )

        assert res.status_code == status.HTTP_200_OK

        assert res.json() == org1_test_post.id

        # validate not still in db
        post_in_db = await posts_repo.get_post_by_id(
            post_id=org1_test_post.id, requesting_user=None
        )

        assert post_in_db is None