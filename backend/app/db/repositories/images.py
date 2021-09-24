from typing import Optional, List, Union

# app
from fastapi import HTTPException, status

# repositories
from app.db.repositories.base import BaseRepository

# auth
from app.services import auth_service

# models
from app.models.post import PostInDB
from app.models.profile import ProfileInDB

UDPATE_POST_IMAGE_QUERY = """
    UPDATE posts
    SET 
        image = :image
    WHERE id = :id
    RETURNING image
"""
UPDATE_PROFILE_IMAGE_QUERY = """
    UPDATE profiles
    SET 
        image = :image
    WHERE id = :id
    RETURNING image
"""


class ImagesRepository(BaseRepository):
    """
    All database actions associated with stored images (profile + posts)
    """

    async def update_fid(
        self, *, id_holder: Union[PostInDB, ProfileInDB], newfid: str
    ) -> None:
        if isinstance(id_holder, PostInDB):
            query = UDPATE_POST_IMAGE_QUERY
        elif isinstance(id_holder, ProfileInDB):
            query = UPDATE_PROFILE_IMAGE_QUERY
        else:
            return None

        updated_fid = await self.db.fetch_one(
            query=query, values={"id": id_holder.id, "image": newfid}
        )

        return updated_fid
