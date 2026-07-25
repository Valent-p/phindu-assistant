from fastapi import APIRouter, Depends

from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["User"])


@router.get("/me", response_model=UserResponse)
async def read_current_user(user: User = Depends(get_current_user)) -> User:
    return user
