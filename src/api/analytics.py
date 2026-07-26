from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.analytics_repo import (
    get_dashboard_summary,
    get_reports_summary,
    get_insights_summary,
    get_transaction_list,
)
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.analytics import (
    DashboardSummary,
    ReportsSummary,
    InsightsSummary,
    TransactionItem,
)

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/dashboard", response_model=DashboardSummary)
async def dashboard_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_dashboard_summary(current_user, db)


@router.get("/reports", response_model=ReportsSummary)
async def reports_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_reports_summary(current_user, db)


@router.get("/insights", response_model=InsightsSummary)
async def insights_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_insights_summary(current_user, db)


@router.get("/transactions", response_model=list[TransactionItem])
async def transaction_list(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_transaction_list(current_user, db)
