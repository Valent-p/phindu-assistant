from datetime import date
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.sale_repo import create_sale, list_sales
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.sale import SaleCreate, SaleResponse

router = APIRouter(prefix="/businesses/{business_id}/sales", tags=["Sales"])


@router.post("/", response_model=SaleResponse, status_code=status.HTTP_201_CREATED)
async def create_sale_endpoint(
    business_id: int,
    payload: SaleCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_sale(business_id, payload, current_user, db)


@router.get("/", response_model=list[SaleResponse])
async def list_sales_endpoint(
    business_id: int,
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_sales(business_id, current_user, db, start_date, end_date)
