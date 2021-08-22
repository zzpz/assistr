# core to testing
from starlette.status import HTTP_201_CREATED
import pytest
from httpx import AsyncClient
from fastapi import FastAPI, status
from databases import Database


# db repositories
from app.db.repositories.users import UsersRepository

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
        # we want to access the database without routing
        user_repo = UsersRepository(db)

        # we will remove this out into conftest
        test_user = UserCreate(
            email="conf@test.com",
            password="password",
            username="conftest",
            superflous="not used here",
        )

        # this query is not exposed publicly as a route
        user_in_db = await user_repo.get_user_by_email(email=test_user.email)

        # make sure they don't exist
        assert user_in_db is None

        # send post request to create and ensure is successful
        # create the json payload for the endpoint
        payload = {"new_user": test_user.dict()}

        # request the endpoint and get a response
        res = await client.post(app.url_path_for("users:create-user"), json=payload)

        # assert response is expected
        assert res.status_code == HTTP_201_CREATED

        # ensure now exists in db
        user_in_db = await user_repo.get_user_by_email(email=test_user.email)
        assert user_in_db is not None
        assert user_in_db.email == test_user.email

        # assert returned json response is equal to user in database
        # tests if we modify it before we send it we don't modify anything incorrectly.

        # create two dicts of the values in the two models and compare dicts
        returned_user = UserPublic(**res.json()).dict(exclude={""})
        assert returned_user == user_in_db.dict(exclude={"password", "salt"})

        # a UserPublic is the same as a UserInDB but with less values
