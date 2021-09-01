from typing import Optional, Union
from pydantic import constr, EmailStr
from app.models.core import IDModelMixin, DateTimeModelMixin, CoreModel
from app.models.user import UserPublic


class PostBase(CoreModel):
    """
    The base post model. Consists of title, description, location - all forms of post models have this.
    """

    title: Optional[str]  # not optional
    short_desc: Optional[str]  # not optional
    long_desc: Optional[str]  # not optional
    location: Optional[str]  # optional? TODO -> geospatial or just strings?
    image = Optional[str]  # image URL will need to be handled separately TODO
    is_published: Optional[bool] = True  # ability to 'hold publishing until'


class PostCreate(PostBase):
    """
    The model used when receiving details to create a post. This is passed to the db to then create and return a PostInDB. It REQUIRES a title, description, location.

    Only orgs can create.
    """

    title: str
    short_desc: str
    location: str


class PostUpdate(PostBase):
    """
    To update posts.

    E.g. make not published OR to update title/desc/loc/image/etc.
    """

    is_published: Optional[bool]


class PostInDB(IDModelMixin, DateTimeModelMixin, PostBase):
    """
    database representation includes id, created/updated + details AND owner.

    MUST return title, desc,loc, org the rest is optional
    """

    org: int  # the owner of post
    title: str
    short_desc: str
    long_desc: str
    location: str


class PostPublic(PostInDB):
    """
    Returns post + owner. Owner is either int OR UserPublic model.
    """

    org: Union[
        int, UserPublic
    ]  # for now we can return a public user as owner or just INT
