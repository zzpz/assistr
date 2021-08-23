# Cryptography library
import bcrypt
from passlib.context import CryptContext

# Models
from app.models.user import UserBase, UserPasswordUpdate

# password cryptography attributes
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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
