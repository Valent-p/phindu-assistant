from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.user_repo import get_by_username, get_current_user, update_profile
from ..models.user import User
from ..schemas.user import UserPublicProfile, UserResponse, UserUpdate

router = APIRouter(prefix="/users", tags=["User"])


@router.get("/me", response_model=UserResponse)
async def read_current_user(user: User = Depends(get_current_user)):
    return user


@router.patch("/me", response_model=UserResponse)
async def update_current_user(
    payload: UserUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await update_profile(user, payload, db)


@router.get("/{username}", response_model=UserPublicProfile)
async def get_public_portfolio(username: str, db: AsyncSession = Depends(get_db)):
    user = await get_by_username(username, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    if not user.is_public:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User profile is not public",
        )
    return user

