from fastapi import APIRouter
from app.api.routes.users import router as users_router

# from app.api.routes.users import router as users_router

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["users"])
# router.include_router(users_router, prefix="/users", tags=["users"])
