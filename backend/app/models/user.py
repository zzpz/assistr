from typing import Optional
from pydantic import EmailStr, constr
from app.models.core import IDModelMixin, DateTimeModelMixin, CoreModel
from app.models.profile import ProfilePublic
from app.models.token import AccessToken

# NOTE: these are similar to CRUD -> one to Create, one to Update, one to 'find' in the database for either Read or Delete


class UserBase(CoreModel):
    """
    The base user model. We don't include those things that are in the database we don't want exposed as any model that extends this will have and have access to its values.
    """

    email: Optional[EmailStr]
    # username: Optional[str] #no usernames
    is_org: bool = False  # for now only one account for org
    # email_verified: bool = False #will include
    # permissions?


class UserCreate(CoreModel):
    """
    This is the model that we use when we wish to create a new user. We expect email and password.

    email
    password

    """

    email: EmailStr
    password: constr(min_length=7, max_length=100)  # constrains the length of


class UserUpdate(CoreModel):
    """
    Users can update their details
    """

    email: EmailStr


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
    """
    Public model. This is what we return to a request. Optionally includes access_token and profile details.
    """

    # we're deciding what we send out publicly here --> UserBase + mixins

    # + extra fields ( profile + authorisation)
    access_token: Optional[AccessToken]
    profile: Optional[ProfilePublic]  # can be a user profile or an org profile
