from pydantic.networks import EmailStr
from app.db.repositories.base import BaseRepository
from app.models.user import UserCreate, UserUpdate, UserInDB


CREATE_USER_QUERY = """
    INSERT INTO users (username, email,salt, password)
    VALUES (:username,:email,:salt,:password)
    RETURNING id, username, email, salt, password, created_at, updated_at;
"""

# don't use select *. bad.
GET_USER_BY_EMAIL_QUERY = """
    SELECT id, username,email, salt, password, created_at,updated_at
    FROM users
    WHERE email = :email;
"""


class UsersRepository(BaseRepository):
    """
    All database actions associated with Users
    """

    async def get_user_by_email(self, *, email: EmailStr) -> UserInDB:
        """
        Queries the database for the first matching user with this email.
        """

        # pass values to query
        user = await self.db.fetch_one(
            query=GET_USER_BY_EMAIL_QUERY, values={"email": email}
        )

        # if no result return none else construct and return a UserInDB model
        if not user:
            return None

        return UserInDB(**user)

    async def create_user(self, *, new_user: UserCreate) -> UserInDB:
        """
        creates a user. Simplistic example. TODO - implement full suite
        """
        query_vals = {**new_user.dict(), "salt": "salt"}  # unpack newuser +add salt

        user = await self.db.fetch_one(query=CREATE_USER_QUERY, values=query_vals)

        return UserInDB(**user)
