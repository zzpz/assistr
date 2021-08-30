from datetime import datetime, timedelta
from typing import Optional, Type

# Cryptography library
import bcrypt
from passlib.context import CryptContext
from app.models.token import JWTCreds, JWTMeta, JWTPayload

# Models
from app.models.user import UserBase, UserPasswordUpdate

# password cryptography attributes
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT
import jwt
from app.core.config import (
    SECRET_KEY,
    JWT_ALGORITHM,
    JWT_AUDIENCE,
    JWT_TOKEN_PREFIX,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)


class AuthService:
    def salt_and_hash_pw(self, *, plaintext_password: str) -> UserPasswordUpdate:
        salt = self.generate_salt()
        hashed = self.hash_password(password=plaintext_password, salt=salt)
        return UserPasswordUpdate(salt=salt, password=hashed)

    def generate_salt(self) -> str:
        return bcrypt.gensalt().decode()

    # note - bcrypt provides its own salt when hashing but we do it anyway
    # keeps things fresh, gets the people going, highlights what we're doing
    def hash_password(self, *, password: str, salt: str) -> str:
        return pwd_context.hash(password + salt)

    def verify_password(
        self,
        password: str,
        salt: str,
        hashed_pw: str,
    ) -> bool:
        """
        Use the hashed password stored in db to compare to provided password. Salt is combined with provided pw to generate hash for comparison.
        """
        return pwd_context.verify(password + salt, hashed_pw)

    ############### JWT #################

    def create_access_token_for_user(
        self,
        *,
        user: Type[UserBase],  # is a user, or some extension of user
        secret_key: str = str(SECRET_KEY),
        audience: str = JWT_AUDIENCE,
        expires_in: int = ACCESS_TOKEN_EXPIRE_MINUTES
    ) -> str:
        """
        Create access token for user (UserInDB), defaults set in core.config.

        Returns token if user instance supplied else None.
        """

        # provide a user or receive nothing
        if not user or not isinstance(user, UserBase):
            return None

        # meta for payload
        jwt_meta = JWTMeta(
            aud=audience,
            iat=datetime.timestamp(datetime.utcnow()),
            exp=datetime.timestamp(datetime.utcnow() + timedelta(minutes=expires_in)),
        )

        # cred for payload
        jwt_creds = JWTCreds(sub=user.email)  # all users have email

        # payload from combining expanded meta and creds
        token_payload = JWTPayload(
            **jwt_meta.dict(),
            **jwt_creds.dict(),
        )

        # create token using jwt library
        access_token = jwt.encode(
            token_payload.dict(), secret_key, algorithm=JWT_ALGORITHM
        )

        return access_token