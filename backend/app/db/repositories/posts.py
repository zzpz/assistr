from typing import Optional, List
from app.models.user import UserInDB

# app
from fastapi import HTTPException, status

# repositories
from app.db.repositories.base import BaseRepository

# auth
from app.services import auth_service

# models
from app.models.post import PostCreate, PostInDB, PostPublic, PostUpdate

CREATE_POST_QUERY = """
    INSERT INTO posts (org_id,title,short_desc,long_desc,image, location,is_published)
    VALUES (:org_id,:title,:short_desc,:long_desc,:image,:location,:is_published)
    RETURNING id, org_id,title,short_desc,long_desc,image,location, is_published,created_at, updated_at;
"""

GET_POST_BY_ID_QUERY = """
    SELECT id, org_id, title, short_desc, long_desc, image, location, is_published, created_at, updated_at
    FROM posts
    WHERE id = :id;
"""

LIST_POSTS_BY_CREATED_QUERY = """
    SELECT id, org_id, title, short_desc, location, is_published,created_at, updated_at
    FROM posts
    ORDER BY created_at
    LIMIT :limit OFFSET :offset
"""

UPDATE_POST_BY_ID_QUERY = """
    UPDATE posts
    SET 
        title = :title,
        short_desc = :short_desc,
        long_desc = :long_desc,
        image = :image,
        location = :location,
        is_published = :is_published
    WHERE id = :id
    RETURNING id, org_id, title, short_desc, long_desc, image, location, is_published, created_at, updated_at
"""


class PostsRepository(BaseRepository):
    """
    All database actions associated with Posts
    """

    async def create_post(
        self, *, new_post: PostCreate, requesting_user: UserInDB
    ) -> PostInDB:
        """
        creates a new post in the database if the requesting user is a valid organisation.
        """

        # create --> assumes atm that ANYONE can create. We will fix this later with a posts_dependency

        post = await self.db.fetch_one(
            query=CREATE_POST_QUERY,
            values={**new_post.dict(), "org_id": requesting_user.id},
        )

        # unpack into a postInDB model
        return PostInDB(**post)

    async def list_posts_by_created_at(
        self, *, offset: int, limit: int
    ) -> List[PostInDB]:
        """
        Gives a subset of all posts created. offset and limit provided by route
        """
        posts = await self.db.fetch_all(
            query=LIST_POSTS_BY_CREATED_QUERY, values={"limit": limit, "offset": offset}
        )
        if not posts:
            return None

        return [PostInDB(**record) for record in posts]

    async def update_post_by_id(
        self,
        *,
        post: PostInDB,
        post_update: PostUpdate,
        # requesting_user: UserInDB  # requesting user not needed.
    ) -> PostInDB:
        """
        Update a post given its ID and the requesting user (model, not id).

        Existence of post + user permissions is handled by api/dependencies/posts.
        """

        # get update params by copying post and overriding updated
        update_params = post.copy(update=post_update.dict(exclude_unset=True))

        # handle database constraints here (nullable/etc)

        # pass the paramaaters from the PostInDB.dict() to the update query
        updated_post = await self.db.fetch_one(
            query=UPDATE_POST_BY_ID_QUERY,
            values=update_params.dict(
                exclude={
                    "org_id",
                    "created_at",
                    "updated_at",
                }  # we dont change org or create + update times ever
            ),
        )

        return PostInDB(**updated_post)

    async def get_post_by_id(self, *, post_id: int, requesting_user: UserInDB) -> None:
        """
        Retrieve a post given its ID and requesting user.
        """

        post = await self.db.fetch_one(
            query=GET_POST_BY_ID_QUERY, values={"id": post_id}
        )

        if not post:
            return None

        return PostInDB(**post)