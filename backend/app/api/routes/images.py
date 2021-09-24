from typing import List, Optional
from fastapi import File, UploadFile, Form  # images


from fastapi import APIRouter, Depends, Body, status, HTTPException
from pydantic.networks import HttpUrl
from starlette.responses import PlainTextResponse

# dependencies
from app.api.dependencies.database import get_repository
from app.api.dependencies.auth import get_current_user
from app.api.dependencies.posts import (
    get_post_id_from_path,
    validate_post_modification_permissons,
)


# models
from app.models.post import PostInDB

# repositories
from app.db.repositories.images import ImagesRepository
from app.models.user import UserInDB

# services
from app.services import image_service

router = APIRouter()


@router.post("/profile")
async def upload_profile_image(
    current_user: UserInDB = Depends(get_current_user),
    image: UploadFile = File(...),  # image as a streamable file
    image_repo: ImagesRepository = Depends(
        get_repository(ImagesRepository)
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
async def upload_post_image(  # technically 'update post image'
    image: UploadFile = File(...),
    post: PostInDB = Depends(get_post_id_from_path),  # posts dependency
    image_repo: ImagesRepository = Depends(
        get_repository(ImagesRepository)
    ),  # images repo
) -> str:
    """
    # UNTESTED
    Takes a file as input

    Returns public file URL
    """
    # make sure post exists and have permissions to edit --> dependency

    fid = post.image
    # get fid from PostInDB.image

    # here we SHOULD just overwrite if it already exists in FS...
    if fid == "static_post_default":
        # upload the image
        newfid = image_service.upload_image(image=image)
        # update the database reference
        await image_repo.update_fid(id_holder=post, newfid=newfid)

        # delete old image not necessary
        # image_service.delete_image(fid=fid)
    else:
        newfid = image_service.upload_image(image=image)
        await image_repo.update_fid(id_holder=post, newfid=newfid)
        image_service.delete_image(fid=fid)

    # no easy 'update?' we basically delete and re-upload.. seems poor
    # I DONT WANT TO UPDATE THE DATABASE EVERYTIME.
    # JUST SAVE THE ID ONCE AND CHANGE WHAT THE URL REFERENCES

    # return public_url
    public_url = image_service.get_public_image_url(fid=newfid)

    return public_url


@router.delete("/", name="images:delete_all", status_code=status.HTTP_200_OK)
async def delete_all_images() -> None:
    """
    # curl "http://localhost:9333/col/delete?collection="
    ## TODO

    ## easily delete all images uploaded.
    """

    # "TODO"
    # curl "http://localhost:9333/col/delete?collection="
