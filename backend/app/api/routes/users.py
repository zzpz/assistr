from typing import List
from fastapi import APIRouter, Depends, Body, status, HTTPException

# we will be adding basic dependencies later TODO
# e.g. current user, db connection, etc


from app.models.user import UserCreate, UserPublic

# repositories
from app.db.repositories.users import UsersRepository
from app.api.dependencies.database import get_repository

router = APIRouter()

# name the router and you can use it across testing and db access
@router.get("/", response_model=List[UserPublic], name="users:list-all-users")
async def get_all_users() -> List[UserPublic]:
    users = [
        UserPublic(id="1", email="temp@temp.com", username="username1"),
        UserPublic(id="2", email="this@willbe.com", username="replaced"),
    ]
    return users


@router.post(
    "/",
    response_model=UserPublic,
    name="users:create-user",
    status_code=status.HTTP_201_CREATED,
)
async def create_user(
    new_user: UserCreate = Body(..., embed=True),  # we pass in body of json
    user_repo: UsersRepository = Depends(get_repository(UsersRepository)),
) -> UserPublic:
    """
    Creates a new user and returns a public model including access token (JWT)
    """

    # register user (send UserCreate to db, receive UserInDB)

    created_user = await user_repo.create_user(new_user=new_user)

    # create JWT and attach to UserPublic model

    # return public model
    return created_user