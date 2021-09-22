from typing import Optional, Union

from app.models.core import CoreModel, IDModelMixin, DateTimeModelMixin
from app.models.user import UserPublic


class ApplyBase(CoreModel):
    """
    The base apply model.
    """


class ApplyCreate(ApplyBase):
    """
    The create an apply model passed to the db repository.
    """


class ApplyInDB(IDModelMixin, DateTimeModelMixin, ApplyBase):
    """
    Database representation of an application.
    """
