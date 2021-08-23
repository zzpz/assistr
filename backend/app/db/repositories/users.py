from databases import Database

# app
from pydantic import EmailStr
from fastapi import HTTPException, status

# repositories
from app.db.repositories.base import BaseRepository

# auth
from app.services import auth_service

# from app.db.repositoris.profiles import ProfilesRepository

# models
from app.models.user import UserCreate, UserInDB, UserPasswordUpdate

CREATE_USER_QUERY = """
    INSERT INTO users (email,salt, password)
    VALUES (:email,:salt,:password)
    RETURNING id, profile_id, email, is_org, salt, password, created_at, updated_at;
"""

# don't use select *. bad.
GET_USER_BY_EMAIL_QUERY = """
    SELECT id, email, is_org, salt, password, created_at, updated_at
    FROM users
    WHERE email = :email;
"""


class UsersRepository(BaseRepository):
    """
    All database actions associated with Users
    """

    # when we init we want to ensure that the auth service is available to the repository --> we're going to be doing auth things
    def __init__(self, db: Database) -> None:
        """
        Standard repository intialise + auth_service + profiles_repo available
        """
        super().__init__(db)
        self.auth_service = auth_service
        # self.profiles_repo = ProfilesRepository(db) TODO

    async def get_user_by_email(self, *, email: EmailStr) -> UserInDB:
        """
        Queries the database for the first matching user with this email.
        """

        # pass values to query
        user = await self.db.fetch_one(
            query=GET_USER_BY_EMAIL_QUERY, values={"email": email}
        )

        # if user, return UserInDB else None
        if user:
            user = UserInDB(**user)

            # perform any other modifications on returning inDB model here TODO
            # e.g. masking password/hash/private details
        return user

    async def create_user(self, *, new_user: UserCreate) -> UserInDB:
        """
        creates a user. Simplistic example. TODO - implement full suite
        """

        # unique constraints exist on email -> confirm is not taken
        existing_user = await self.get_user_by_email(email=new_user.email)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="That email is alredy taken. Login or try another.",
            )

        # UserPasswordUpdate model with password and salt using auth service
        hashed_pw = self.auth_service.salt_and_hash_pw(
            plaintext_password=new_user.password
        )

        # copy and replace in the UserCreate model
        new_user_hashed_pw = new_user.copy(update=hashed_pw.dict())

        # create user in database
        query_vals = new_user_hashed_pw.dict()
        created_user = await self.db.fetch_one(
            query=CREATE_USER_QUERY, values=query_vals
        )

        # create profile

        # unpack returned data and create a UserInDB Model

        # attach profile and returned user data to UserInDB Model

        return UserInDB(**created_user)
