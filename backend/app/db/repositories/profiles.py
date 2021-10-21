# users have a profile table

# orgs have a profile table

from app.models.profile import ProfileCreate, ProfilePublic
from app.models.user import UserInDB
from databases import Database
from fastapi import HTTPException, status

from app.services import auth_service
from app.db.repositories.base import BaseRepository

# models
from app.models.profile import ProfileCreate, ProfileInDB, ProfilePublic, ProfileUpdate

CREATE_PROFILE_QUERY = """
    INSERT INTO profiles (first, last, org_name, org_loc, phone, bio, image, user_id)
    VALUES (:first, :last, :org_name, :org_loc, :phone, :bio, :image, :user_id)
    RETURNING
    id, org_name, org_loc, phone, bio, image, user_id, created_at, updated_at
"""

# if we have a user_ID we can skip straight to the profile table rather than via email and profile lookup
GET_PROFILE_BY_ID = """
    SELECT     id, first, last, org_name, org_loc, phone, bio, image, user_id, created_at, updated_at
    FROM profiles
    WHERE user_id = :user_id;
"""

UPDATE_PROFILE_QUERY = """
    UPDATE profiles
    SET 
        first       = :first,
        last        = :last,
        org_name    = :org_name,
        org_loc     = :org_loc,
        phone       = :phone,
        bio         = :bio,
        image       = :image
    WHERE user_id = :user_id
    RETURNING id, first, last, org_name, org_loc, phone, bio, image, user_id, created_at, updated_at;
"""

# UPDATE_ORG_PROFILE_QUERY = """
#     UPDATE profiles
#     SET
#         phone       = :phone,
#         bio         = :bio,
#         image       = :image
#     WHERE user_id = :user_id
#     RETURNING id, first, last, phone, bio, image, user_id, created_at, updated_at;
# """


class ProfilesRepository(BaseRepository):
    """
    All things related to profile database querying
    """

    def __init__(self, db: Database) -> None:
        """
        Standard repository + auth_service + image_service?
        """
        super().__init__(db)

    async def create_profile_for_user(
        self,
        *,
        profile_create: ProfileCreate,
    ) -> ProfileInDB:
        """
        Given a user_id and is_org we create a profile.

        # we don't create a profile really, we just kind of make an empty entry with id and update separately.
        """

        created_profile = await self.db.fetch_one(
            query=CREATE_PROFILE_QUERY, values=profile_create.dict()
        )

        return ProfileInDB(**created_profile)

    async def get_profile_by_user_id(
        self,
        *,
        user_id: int,
    ) -> ProfileInDB:
        """
        Get the profile of a given user.
        """

        profile_record = await self.db.fetch_one(
            query=GET_PROFILE_BY_ID, values={"user_id": user_id}
        )

        if not profile_record:
            return None

        return ProfileInDB(**profile_record)

    # get profile by email????

    async def update_profile(
        self,
        *,
        profile: ProfileInDB,
        profile_update: ProfileUpdate,
    ) -> ProfileInDB:
        """
        Update a profile of a given user.

        # get the current profile
        # use that as the supplying values, overwrite with supplied updates
        # return
        """

        # get update params by copying current profile and overriding updated
        update_params = profile.copy(update=profile_update.dict(exclude_unset=True))

        # handle database constraints here (nullable/etc)

        # pass the paramaaters from the profile.dict() to the update query
        updated_profile = await self.db.fetch_one(
            query=UPDATE_PROFILE_QUERY,
            values=update_params.dict(
                exclude={
                    "id",  # we don't use pk we use user_id as the where clause
                    "created_at",
                    "updated_at",
                },
            ),
        )

        if not updated_profile:
            return None

        return ProfileInDB(**updated_profile)
