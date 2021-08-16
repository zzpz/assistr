from typing import List
from fastapi import APIRouter


router = APIRouter()


@router.get("/")
async def get_all_users() -> List[dict]:
    users = [
        {"id": 1, "profile": 1, "type": "user", "email": "abc@123.com"},
        {"id": 2, "profile": 2, "type": "org", "email": "manager@org.com"},
    ]

    return users
