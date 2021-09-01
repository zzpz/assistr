from typing import List
from fastapi import APIRouter, Body, Path, Depends, HTTPException, status

from app.models.post import PostCreate, PostPublic

from app.db.repositories.posts import PostsRepository


# dependencies
from app.api.dependencies.database import get_repository
from app.api.dependencies.auth import get_current_org_user, get_current_user
from app.models.user import UserInDB


router = APIRouter()


@router.get(
    "/",
    response_model=List[PostPublic],
    name="posts:list-all-posts",
    status_code=status.HTTP_200_OK,
)
async def list_all_posts(
    posts_repo: PostsRepository = Depends(get_repository(PostsRepository)),
) -> List[PostPublic]:
    """
    Lists all posts made. Will be developed further with pagination.

    # untested
    """
    return await posts_repo.list_all_posts()


@router.post(
    "/",
    response_model=PostPublic,
    name="posts:create-post",
    status_code=status.HTTP_201_CREATED,
)
async def create_new_post(
    new_post: PostCreate = Body(..., embed=True),  # passed in body as 'new_post'
    posts_repo: PostsRepository = Depends(get_repository(PostsRepository)),
    current_user: UserInDB = Depends(get_current_user),
) -> PostPublic:
    """
    Creates a new post.

    # TODO
    # current user should be an org to create
    # untested

    """
    created_post = await posts_repo.create_post(
        new_post=new_post, requesting_user=current_user
    )

    return created_post