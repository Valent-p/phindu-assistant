from datetime import date
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.expense_record import ExpenseRecord
from ..models.user import User
from ..schemas.expense import ExpenseCreate
from .business_repo import get_business


async def create_expense(
    business_id: int, payload: ExpenseCreate, current_user: User, db: AsyncSession
) -> ExpenseRecord:
    # Verify business ownership
    await get_business(business_id, current_user, db)

    expense_date_val = payload.expense_date or date.today()

    expense = ExpenseRecord(
        business_id=business_id,
        amount=payload.amount,
        category=payload.category,
        description=payload.description,
        expense_date=expense_date_val,
        is_recurring=payload.is_recurring,
        notes=payload.notes,
    )
    db.add(expense)
    await db.commit()
    await db.refresh(expense)
    return expense


async def list_expenses(
    business_id: int, current_user: User, db: AsyncSession, start_date: date | None = None, end_date: date | None = None
) -> list[ExpenseRecord]:
    # Verify business ownership
    await get_business(business_id, current_user, db)

    stmt = select(ExpenseRecord).where(ExpenseRecord.business_id == business_id)
    if start_date:
        stmt = stmt.where(ExpenseRecord.expense_date >= start_date)
    if end_date:
        stmt = stmt.where(ExpenseRecord.expense_date <= end_date)
        
    stmt = stmt.order_by(ExpenseRecord.expense_date.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())
