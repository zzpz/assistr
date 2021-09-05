# core to testing
from typing import Callable
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
        res = await client.get(app.url_path_for("posts:list-all-posts"))
        # response
        assert res.status_code != status.HTTP_404_NOT_FOUND

        res = await client.get(app.url_path_for("posts:create-post"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

        # res = await client.get(app.url_path_for("posts:update-post-by-id"))
        assert res.status_code != status.HTTP_404_NOT_FOUND
        # res = await client.get(app.url_path_for("posts:delete-post"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

        # repeat for all other endpoints
        # res = await client.get(app.url_path_for("posts:update-post"))
        # res = await client.get(app.url_path_for("posts:delete-post"))
        # res = await client.get(app.url_path_for("posts:"))


class TestCreatePost:
    async def test_unauthorised_user_cannot_create(
        self,
        app: FastAPI,
        client: AsyncClient,
        new_post: PostCreate,
    ) -> None:
        """
        If no authentication/access token is provided, create should return unauthorized.
        """
        res = await client.post(
            app.url_path_for("posts:create-post"),
            json={"new_post": new_post.dict()},
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED
        # client is not authenticated

    async def test_valid_input_creates_post(
        self,
        app: FastAPI,
        test_user_auth_client: AsyncClient,
        test_user: UserInDB,
        new_post: PostCreate,
    ) -> None:
        """
        test_user is logged in and attempts to create a post.

        Will fail with future changes to orgs only.
        """
        res = await test_user_auth_client.post(
            app.url_path_for("posts:create-post"),
            json={"new_post": new_post.dict()},
        )

        created_post = PostPublic(**res.json())
        assert res.status_code == 201
        assert created_post.title == new_post.title
        assert created_post.org == test_user.id

    async def test_valid_input_creates_post_belonging_to_org(
        self,
        app: FastAPI,
        create_auth_client: Callable,
        test_user: UserInDB,  # will be changed to an org user
        new_post: PostCreate,
    ) -> None:
        """
        Only an org should be able to create a post.
        """
        org_user = test_user  #

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
        assert created_post.org == org_user.id
