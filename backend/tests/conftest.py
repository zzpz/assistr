# here we can create and configure things that are common to tests

# we make fixtures for testing and then use them in our user/post/etc tests

# e.g.:

# we create common test_users with X privileges in the testing database
# we create a client using a test_user to make requests

import warnings
import os

from alembic import config

# testing
import pytest

# Request + response
from httpx import AsyncClient  # emulates a client
from fastapi import FastAPI
from asgi_lifespan import LifespanManager

# Database
from databases import Database
import alembic
from alembic.config import Config

# Repositories
from app.db.repositories.users import UsersRepository

# Models
from app.models.user import UserCreate, UserInDB

# CORE: all tests need this
@pytest.fixture(scope="session")  # exists for duration of testing session
def apply_migrations():
    """
    Applys alembic migrations to the testing database prior to testing. Then downgrades applied migrations at end of testing session.
    """
    warnings.filterwarnings("ignore", category=DeprecationWarning)
    os.environ["TESTING"] = "1"  # see app/core/config
    config = Config("alembic.ini")

    alembic.command.upgrade(config, "head")
    yield
    alembic.command.downgrade(config, "base")


# CORE
@pytest.fixture
def app(apply_migrations: None) -> FastAPI:
    """
    Creates and returns an app for use in tests.
    """
    from app.api.server import get_application

    return get_application()


# CORE
@pytest.fixture
def db(app: FastAPI) -> Database:
    """
    Uses the app's state to return the database. (testing db not live)
    """
    return app.state._db


# CORE
@pytest.fixture
async def client(app: FastAPI) -> AsyncClient:
    """
    Emulates a client (browser/mobileapp/etc) and sends to the application
    """
    async with LifespanManager(app):
        async with AsyncClient(
            app=app,
            base_url="http://testing",
            headers={"Content-Type": "application/json"},
        ) as client:
            yield client


# USERS - creates a test_user that exists throughout life of testing
@pytest.fixture
async def test_user(db: Database) -> UserInDB:
    test_user = UserCreate(
        email="conf@test.com",
        password="password",
        username="conftest",
        superflous="value doesn't exist in UserCreate",
    )

    user_repo = UsersRepository(db)

    # database persists for duration of the testing session
    existing_user = await user_repo.get_user_by_email(email=test_user.email)
    if existing_user:
        return existing_user
    # else

    return await user_repo.create_user(new_user=test_user)


# POSTS - creates a test_post that exists throughout life of testing
@pytest.fixture
async def test_post(db: Database) -> None:
    return None