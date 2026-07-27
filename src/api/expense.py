from datetime import date
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.expense_repo import create_expense, list_expenses
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.expense import ExpenseCreate, ExpenseResponse

router = APIRouter(prefix="/businesses/{business_id}/expenses", tags=["Expenses"])


@router.post("/", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
async def create_expense_endpoint(
    business_id: int,
    payload: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_expense(business_id, payload, current_user, db)


@router.get("/", response_model=list[ExpenseResponse])
async def list_expenses_endpoint(
    business_id: int,
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_expenses(business_id, current_user, db, start_date, end_date)
