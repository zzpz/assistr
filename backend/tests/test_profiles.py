# core to testing
import pytest
from httpx import AsyncClient
from fastapi import FastAPI, status
from databases import Database

from typing import Callable


# db repositories

# models
# from app.models.user import UserCreate, UserInDB, UserPublic
from app.models.profile import ProfilePublic, ProfileUpdate

# services

# decorates all tests with this mark ( @pytest.mark.asyncio
pytestmark = pytest.mark.asyncio


class TestProfileRoutes:
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        # request
        res = await client.get(
            app.url_path_for("profiles:get-profile-by-id", user_id=1)
        )
        # response
        assert res.status_code != status.HTTP_404_NOT_FOUND

        res = await client.get(app.url_path_for("profiles:get-current-user-profile"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

        res = await client.get(app.url_path_for("profiles:update-current-user-profile"))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestGetProfile:
    async def test_get_own_profile(self, app: FastAPI, client: AsyncClient) -> None:
        pass

    async def test_get_other_profile(self, app: FastAPI, client: AsyncClient) -> None:
        pass


class TestUpdateProfile:
    async def test_update_own_profile_with_valid_inputs(
        self, app: FastAPI, client: AsyncClient
    ) -> None:
        pass

    async def test_update_invalid_inputs_fails(
        self, app: FastAPI, client: AsyncClient
    ) -> None:
        pass

    async def test_update_unowned_profile_fails(
        self, app: FastAPI, client: AsyncClient
    ) -> None:
        pass
