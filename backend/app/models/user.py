from typing import Optional
from pydantic import EmailStr, constr
from app.models.core import IDModelMixin, DateTimeModelMixin, CoreModel

# NOTE: these are similar to CRUD -> one to Create, one to Update, one to 'find' in the database for either Read or Delete


class UserBase(CoreModel):
    """
    The base user model. We don't include those things that are in the database we don't want exposed as any model that extends this will have and have access to its values.
    """

    email: Optional[EmailStr]
    username: Optional[str]
    # type
    # verified
    # etc


class UserCreate(CoreModel):
    """
    This is the model that we use when we wish to create a new user. We expect email, password and a valid username.
    """

    email: EmailStr
    password: constr(min_length=7, max_length=100)  # constrains the length of pw
    username: constr(min_length=3, regex="^[a-zA-Z0-9_-]+$")
    # uname may not be necessary we need to define login detail TODO


class UserUpdate(CoreModel):
    """
    Users can update their details
    """

    email: EmailStr
    username: constr(min_length=3, regex="^[a-zA-Z0-9_-]+$")
    # uname may not be necessary we need to define login detail TODO


class UserPasswordUpdate(CoreModel):
    """
    Users can update their password, we use a separate model because we will require the user to be logged in to do so.
    """

    password: constr(min_length=7, max_length=100)
    salt: str  # we don't actually need this but it's informative


class UserInDB(IDModelMixin, DateTimeModelMixin, UserBase):
    """
    This extends our base model to include id, created, updated + password and salt.

    Functionally it represents one row of the 'users' table.
    """

    password: constr(min_length=7, max_length=100)
    salt: str


class UserPublic(IDModelMixin, DateTimeModelMixin, UserBase):
    pass  # we're deciding what we send out publicly here --> UserBase + mixins
