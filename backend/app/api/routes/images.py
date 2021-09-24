from typing import List, Optional
from fastapi import File, UploadFile, Form  # images


from fastapi import APIRouter, Depends, Body, status, HTTPException
from pydantic.networks import HttpUrl
from starlette.responses import PlainTextResponse

# dependencies
from app.api.dependencies.database import get_repository
from app.api.dependencies.auth import get_current_user
from app.api.dependencies.posts import validate_post_modification_permissons

# models
from app.models.token import AccessToken
from app.models.user import UserCreate, UserInDB, UserPublic

# repositories
from app.db.repositories.users import UsersRepository

# services
from app.services import image_service

router = APIRouter()


@router.post("/profile")
async def upload_profile_image(
    image: UploadFile = File(...),  # image as a streamable file
    image_repo: UsersRepository = Depends(
        get_repository(UsersRepository)
    ),  # images repo
) -> str:
    """
    Takes a file as input (assumed to be an image).

    Requests a file id from FILESTORE using image_service
    """
    return "app.com/volume,fileID"


@router.post(
    "/{post_id}/",
    response_model=str,
    status_code=status.HTTP_201_CREATED,
    # dependencies=[Depends(validate_post_modification_permissons)],
)
async def upload_post_image(
    image: UploadFile = File(...),
    image_repo: UsersRepository = Depends(
        get_repository(UsersRepository)
    ),  # images repo
) -> str:
    """
    Takes a file as input

    Returns public file URL
    """

    # return image.filename
    # fid = image_service.upload_image(image)

    fid = image_service.upload_image(image=image)

    return f"fid: {fid} added then deleted"
    # return "app.com/volume,fileID"