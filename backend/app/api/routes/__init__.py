from fastapi import APIRouter
from app.api.routes.users import router as users_router
from app.api.routes.posts import router as posts_router
from app.api.routes.profiles import router as profiles_router
from app.api.routes.images import router as images_router

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(posts_router, prefix="/posts", tags=["opportunities"])
router.include_router(profiles_router, prefix="/profiles", tags=["profiles"])
router.include_router(images_router, prefix="/images", tags=["images"])