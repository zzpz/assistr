# core to testing
import pytest
from httpx import AsyncClient
from fastapi import FastAPI, status
from databases import Database


# db repository
from app.db.repositories import UsersRepository

# models
from app.models.user import UserCreate, UserInDB, UserPublic

# decorates all tests with this mark ( @pytest.mark.asyncio
pytestmark = pytest.mark.asyncio


# testing follows pretty common pattern:

# testroutes exist
# testroutes inputs fail correctly
# test actions with various client authorisations
# e.g. logged in, not logged in, allowed,not allowed -> get/create/delete/etc


class TestUserRoutes:
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        # request
        res = await client.get(app.url_path_for("users:list-all-users"))
        # response
        assert res.status_code != status.HTTP_404_NOT_FOUND

        res = await client.post(app.url_path_for("users:create-user"))
        # repeat for all other endpoints
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_invalid_input_fails(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.post(app.url_path_for("users:create-user"), json={})
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestUserRegistration:
    async def test_valid_input_creates_user(
        self, app: FastAPI, client: AsyncClient, db: Database
    ) -> None:
        assert True
