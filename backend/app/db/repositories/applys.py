from typing import Optional, List

# app
from fastapi import HTTPException, status

# repositories
from app.db.repositories.base import BaseRepository

# auth
from app.services import auth_service

# models
from app.models.user import UserInDB
from app.models.post import PostInDB
from app.models.apply import ApplyCreate


class ApplysRepository(BaseRepository):
    """
    All database actions associated with applications (applys)
    """

    async def create_apply(self, *, requesting_user: UserInDB) -> None:
        pass