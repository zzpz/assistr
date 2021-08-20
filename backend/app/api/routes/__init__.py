from fastapi import APIRouter
from app.api.routes.users import router as users_router

# from app.api.routes.posts import router as posts_router TODO

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["users"])
# router.include_router(posts_router, prefix="/posts", tags=["posts"])
