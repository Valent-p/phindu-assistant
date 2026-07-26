from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.transaction_repo import (
    create_sale,
    list_sales,
    create_expense,
    list_expenses
)
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.sale import SaleCreate, SaleResponse
from ..schemas.expense import ExpenseCreate, ExpenseResponse

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.post("/sales", response_model=SaleResponse, status_code=status.HTTP_201_CREATED)
async def create_sale_endpoint(
    payload: SaleCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_sale(payload, current_user, db)

@router.get("/sales", response_model=list[SaleResponse])
async def list_sales_endpoint(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_sales(current_user, db)

@router.post("/expenses", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
async def create_expense_endpoint(
    payload: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_expense(payload, current_user, db)

@router.get("/expenses", response_model=list[ExpenseResponse])
async def list_expenses_endpoint(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_expenses(current_user, db)
