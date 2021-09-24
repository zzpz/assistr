### we need a way to both return a userprofile and a org profile publicly
### their inDB models will be different
### same table though
# how to do this through inherit and or mixins...


from typing import Optional
from pydantic import EmailStr, constr, HttpUrl, FilePath
from app.models.core import IDModelMixin, DateTimeModelMixin, CoreModel


class ProfileBase(CoreModel):
    """
    The base profile model. Core elements to both users and orgs.
    """

    # user
    first: Optional[str]
    last: Optional[str]

    # org
    org_name: Optional[str]
    org_loc: Optional[str]

    # common
    phone: Optional[constr(min_length=3, max_length=20)]  # no constraints
    bio: Optional[str]
    image: Optional[
        str
    ] = "static_profile_default"  # Optional[HttpUrl] Optional[FilePath]


class ProfileCreate(ProfileBase):
    """
    The core fields REQUIRED to create a profile + optional fields.

    We only REQUIRE user_id to create. (Sign up is v.simple)
    """

    user_id: int


class ProfileUpdate(ProfileBase):
    """
    Users can update any fields found in the base class, but they cannot update user_id.
    """

    pass


class ProfileInDB(IDModelMixin, DateTimeModelMixin, ProfileBase):
    """
    Contents of database record for profile.
    """

    user_id: int


class ProfilePublic(ProfileInDB):
    """
    The public model of the user. Inherits from ProfileInDB. Don't store sensitive info in profile table --> it will be public.

    Adds nothing else atm.
    """

    pass


class ProfilePublicUser(ProfilePublic):
    """
    User profile.
    """

    pass


class ProfilePublicOrg(ProfilePublic):
    """
    Org Profile.
    """

    pass