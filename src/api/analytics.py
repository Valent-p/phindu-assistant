from datetime import date
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.analytics_repo import (
    get_break_even,
    get_expenses_breakdown,
    get_forecast,
    get_kpi_summary,
    get_sales_over_time,
    get_top_products,
)
from ..db.business_repo import get_business
from ..db.database import get_db
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.analytics import (
    BreakEvenAnalysis,
    ExpenseCategoryBreakdown,
    ForecastResponse,
    KPISummary,
    SalesOverTimeResponse,
    TopProduct,
)

router = APIRouter(prefix="/analytics/{business_id}", tags=["Analytics"])


async def verify_access(business_id: int, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    await get_business(business_id, current_user, db)
    return current_user, db


@router.get("/summary", response_model=KPISummary)
async def analytics_summary(
    business_id: int,
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    access: tuple[User, AsyncSession] = Depends(verify_access),
):
    _, db = access
    return await get_kpi_summary(business_id, db, start_date, end_date)


@router.get("/sales-over-time", response_model=SalesOverTimeResponse)
async def analytics_sales_over_time(
    business_id: int,
    period: str = Query("monthly", regex="^(weekly|monthly|yearly)$"),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    access: tuple[User, AsyncSession] = Depends(verify_access),
):
    _, db = access
    return await get_sales_over_time(business_id, db, period, start_date, end_date)


@router.get("/top-products", response_model=list[TopProduct])
async def analytics_top_products(
    business_id: int,
    limit: int = Query(5, ge=1, le=50),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    access: tuple[User, AsyncSession] = Depends(verify_access),
):
    _, db = access
    return await get_top_products(business_id, db, start_date, end_date, limit)


@router.get("/expenses-by-category", response_model=list[ExpenseCategoryBreakdown])
async def analytics_expenses_by_category(
    business_id: int,
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    access: tuple[User, AsyncSession] = Depends(verify_access),
):
    _, db = access
    return await get_expenses_breakdown(business_id, db, start_date, end_date)


@router.get("/break-even", response_model=BreakEvenAnalysis)
async def analytics_break_even(
    business_id: int,
    access: tuple[User, AsyncSession] = Depends(verify_access),
):
    _, db = access
    return await get_break_even(business_id, db)


@router.get("/forecast", response_model=ForecastResponse)
async def analytics_forecast(
    business_id: int,
    periods: int = Query(3, ge=1, le=12),
    access: tuple[User, AsyncSession] = Depends(verify_access),
):
    _, db = access
    return await get_forecast(business_id, db, periods)
