from datetime import datetime, timedelta
from typing import Optional, Type

# http
from fastapi import status, UploadFile
from fastapi import HTTPException
from pydantic import ValidationError

# config
from app.core.config import FS_MASTER_PORT, FS_MASTER_URL

# Models

from pyseaweed import WeedFS


class ImageService:

    fs: WeedFS
    # file upload

    # file id --> store in database

    # get file_url --> take fid from database and request

    # return file

    def __init__(self) -> None:
        self.fs = WeedFS(master_addr=FS_MASTER_URL, master_port=FS_MASTER_PORT)

    def upload_image(self, image: UploadFile) -> None:
        """
        Takes File, returns fid, saves fid to database?
        """

        # UploadFile is a streamable object

        # return image.filename

        # # # TODO: overwrite filename with profile_userID, post_postID?
        fid = self.fs.upload_file(stream=image.file, name=image.filename)

        self.fs.delete_file(fid)

        return fid


# url for the image
