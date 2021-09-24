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

    fs = WeedFS(FS_MASTER_URL, FS_MASTER_PORT)

    # file upload

    # file id --> store in database

    # get file_url --> take fid from database and request

    # return file

    def upload_file(f) -> None:
        """
        Takes File, returns fid
        """
        pass


# url for the image
