from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.user_repo import get_current_user
from ..models.business import Business
from ..models.user import User
from ..schemas.business import BusinessCreate, BusinessResponse

router = APIRouter(prefix="/business", tags=["business"])


@router.post("/", response_model=BusinessResponse, status_code=status.HTTP_201_CREATED)
async def create_business(
    payload: BusinessCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    biz = Business(
        owner_id=current_user.id,
        name=payload.name,
        description=payload.description,
        industry=payload.industry,
        currency=payload.currency or "USD",
    )
    db.add(biz)
    await db.commit()
    await db.refresh(biz)
    return biz


@router.get("/", response_model=BusinessResponse | None)
async def get_my_business(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Business).where(Business.owner_id == current_user.id, Business.is_active).limit(1)
    )
    return result.scalar_one_or_none()
