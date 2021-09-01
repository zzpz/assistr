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
    RETURNING id, org_id as org,title,short_desc,long_desc,image,location, is_published,created_at, updated_at;
"""

GET_POST_BY_ID_QUERY = """
    SELECT id, org_id, title, short_desc, long_desc, image, location, is_published, created_at, updated_at
    FROM posts
    WHERE id = :id;
"""

LIST_ALL_POSTS_QUERY = """
    SELECT id,org_id as org,title,short_desc,location,is_published,created_at,updated_at
    FROM posts
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

        # create --> assumes atm that ANYONE can create. We will fix this with a posts_dependency

        post = await self.db.fetch_one(
            query=CREATE_POST_QUERY,
            values={**new_post.dict(), "org_id": requesting_user.id},
        )

        # unpack into a postInDB model
        return PostInDB(**post)

    async def list_all_posts(self) -> List[PostInDB]:
        """
        temporary to show listing of all posts made.
        """
        posts = await self.db.fetch_all(query=LIST_ALL_POSTS_QUERY)
        if not posts:
            return None

        return [PostInDB(**record) for record in posts]

    # async def get_(self, *, val:PostCreate) -> PostInDB:
    #     """
    #     Queries the database for all posts made
    #     """
    #     return None

    # async def create_(self, *, val:PostCreate) -> PostInDB:
    #     """
    #     creates a user
    #     """
    #     return None
