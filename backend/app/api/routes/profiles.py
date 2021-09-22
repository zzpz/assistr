from fastapi import APIRouter, Path, Body, Depends, status
from fastapi.exceptions import HTTPException

# dependencies
from app.api.dependencies.auth import get_current_user
from app.api.dependencies.database import get_repository

# repos
from app.db.repositories.profiles import ProfilesRepository

# models
from app.models.user import UserInDB
from app.models.profile import ProfilePublic, ProfileUpdate

router = APIRouter()


@router.get(
    "/{user_id}/",  # this seems bad unless we use UUID.
    response_model=ProfilePublic,
    name="profiles:get-profile-by-id",
)
async def get_profile_by_user_id(
    *,
    user_id: int = Path(...),
    profiles_repo: ProfilesRepository = Depends(get_repository(ProfilesRepository)),
) -> ProfilePublic:
    """
    # UNTESTED

    Given a user_id get the relevant profile.
    """
    profile = await profiles_repo.get_profile_by_user_id(user_id=user_id)

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No profile found for that user.",
        )

    return profile


@router.get(
    "/me/",
    response_model=ProfilePublic,
    name="profiles:get-current-user-profile",
)
async def get_own_profile(
    current_user: UserInDB = Depends(get_current_user),
    profiles_repo: ProfilesRepository = Depends(get_repository(ProfilesRepository)),
) -> ProfilePublic:
    """
    # UNTESTED

    Return the current user's profile.
    """

    uid = current_user.id
    profile = await profiles_repo.get_profile_by_user_id(user_id=uid)

    return profile


@router.put(
    "/me/",
    response_model=ProfilePublic,
    name="profiles:update-current-user-profile",
)
async def update_own_profile(
    current_user: UserInDB = Depends(get_current_user),
    profiles_repo: ProfilesRepository = Depends(get_repository(ProfilesRepository)),
    update_profile: ProfileUpdate = Body(..., embed=True),
) -> ProfilePublic:
    """
    # UNTESTED
    # does nothing
    """

    return None