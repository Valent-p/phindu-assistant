from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.business_repo import (
    create_business,
    get_business,
    list_businesses,
    update_business,
)
from ..db.database import get_db
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.business import BusinessCreate, BusinessResponse, BusinessUpdate

router = APIRouter(prefix="/businesses", tags=["Businesses"])


@router.post("/", response_model=BusinessResponse, status_code=status.HTTP_201_CREATED)
async def create_business_endpoint(
    payload: BusinessCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_business(payload, current_user, db)


@router.get("/", response_model=list[BusinessResponse])
async def list_businesses_endpoint(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_businesses(current_user, db)


@router.get("/{business_id}", response_model=BusinessResponse)
async def get_business_endpoint(
    business_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_business(business_id, current_user, db)


@router.patch("/{business_id}", response_model=BusinessResponse)
async def update_business_endpoint(
    business_id: int,
    payload: BusinessUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await update_business(business_id, payload, current_user, db)
