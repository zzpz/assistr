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
        self.fs = WeedFS(
            master_addr=FS_MASTER_URL, master_port=FS_MASTER_PORT, use_public_url=False
        )

    def upload_image(self, image: UploadFile) -> str:
        """
        Takes File, returns file ID
        """

        # UploadFile is a streamable object

        # return image.filename

        # fid = self.fs.upload_file(stream=image.file, name=image.filename)

        # no storing names anywhere
        fid = self.fs.upload_file(stream=image.file, name="test")

        return fid

    def delete_image(self, fid: str) -> bool:
        """
        Deletes the supplied file id from the filestore...

        # need to also alter the relevant 'image' in DB <--
        """
        # revert the image in database to static_default prior to this call

        # not great, can return true, false, or none

        # check exists
        if not self.fs.file_exists(fid=fid):
            return None  # no such file exists

        # true if deleted false otherwise
        return self.fs.delete_file(fid=fid)

    def get_public_image_url(self, fid: str) -> str:
        """
        Takes a fid, gets the image and returns its public url.

        Used by repositories to translate stored DB value to a url and return in json.
        """

        if not self.fs.file_exists(fid=fid):
            return None  # DNE

        img_url = self.fs.get_file_url(fid=fid, public=True)

        return img_url
