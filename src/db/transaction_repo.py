from datetime import date
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .helpers import get_user_business_id
from ..models.sale_record import SaleRecord
from ..models.expense_record import ExpenseRecord
from ..models.product import Product
from ..models.user import User
from ..schemas.sale import SaleCreate
from ..schemas.expense import ExpenseCreate


async def create_sale(payload: SaleCreate, current_user: User, db: AsyncSession) -> SaleRecord:
    business_id = await get_user_business_id(current_user, db)
    if not business_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No business found for this user. Please create a business first.")

    result = await db.execute(
        select(Product).where(Product.id == payload.product_id, Product.user_id == current_user.id)
    )
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    unit_price = payload.unit_price if payload.unit_price is not None else product.price

    sale = SaleRecord(
        business_id=business_id,
        product_id=product.id,
        quantity=payload.quantity,
        unit_price=unit_price,
        unit_cost=product.unit_cost,
        discount_amount=payload.discount_amount,
        is_debt=payload.is_debt,
        sale_date=payload.sale_date or date.today(),
        notes=payload.notes,
    )

    db.add(sale)
    await db.commit()
    await db.refresh(sale)
    sale.__dict__["product_name"] = product.name
    return sale


async def list_sales(current_user: User, db: AsyncSession) -> list[SaleRecord]:
    business_id = await get_user_business_id(current_user, db)
    if not business_id:
        return []
    stmt = select(SaleRecord).where(SaleRecord.business_id == business_id).order_by(SaleRecord.sale_date.desc())
    return list((await db.execute(stmt)).scalars().all())


async def create_expense(payload: ExpenseCreate, current_user: User, db: AsyncSession) -> ExpenseRecord:
    business_id = await get_user_business_id(current_user, db)
    if not business_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No business found for this user.")

    expense = ExpenseRecord(
        business_id=business_id,
        amount=payload.amount,
        category=payload.category,
        description=payload.description,
        expense_date=payload.expense_date or date.today(),
        is_recurring=payload.is_recurring,
        notes=getattr(payload, 'notes', None),
    )
    db.add(expense)
    await db.commit()
    await db.refresh(expense)
    return expense


async def list_expenses(current_user: User, db: AsyncSession) -> list[ExpenseRecord]:
    business_id = await get_user_business_id(current_user, db)
    if not business_id:
        return []
    stmt = select(ExpenseRecord).where(ExpenseRecord.business_id == business_id).order_by(ExpenseRecord.expense_date.desc())
    return list((await db.execute(stmt)).scalars().all())
