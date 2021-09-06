from fastapi import HTTPException, Depends, Path, status

from app.models.user import UserInDB
from app.models.post import PostInDB

from app.db.repositories.posts import PostsRepository

from app.api.dependencies.database import get_repository
from app.api.dependencies.auth import get_current_user  #


async def get_post_id_from_path(
    post_id: int = Path(..., ge=1),  # /{id}/
    current_user: UserInDB = Depends(get_current_user),
    posts_repo: PostsRepository = Depends(get_repository(PostsRepository)),
) -> PostInDB:
    """
    Used on any route with {post_id} in the path e.g. app/x/{post_id}/

    To get the database model for a given post if it exists.
    (e.g. owner + post details)

    returns PostInDB model
    """
    post = await posts_repo.get_post_by_id(
        post_id=post_id, requesting_user=current_user
    )
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No post with that id + user.",
        )

    return post


def validate_post_modification_permissons(
    current_user: UserInDB = Depends(get_current_user),
    post: PostInDB = Depends(get_post_id_from_path),  # sub dependency
) -> None:
    """
    we require that the current user is TODO- a 'member' of the org with valid edit permissions

    THE ORG that owns this post
    """
    if post is not None:  # should never be none
        if post.org_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Action forbidden. Users may only modify posts they are the owner of.",
            )