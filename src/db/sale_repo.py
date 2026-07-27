from datetime import date
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.product import Product
from ..models.sale_record import SaleRecord
from ..models.user import User
from ..schemas.sale import SaleCreate
from .business_repo import get_business


async def create_sale(
    business_id: int, payload: SaleCreate, current_user: User, db: AsyncSession
) -> SaleRecord:
    # Verify business ownership
    await get_business(business_id, current_user, db)

    # Get product to snapshot current price/cost
    stmt = select(Product).where(
        Product.id == payload.product_id, Product.business_id == business_id
    )
    result = await db.execute(stmt)
    product = result.scalar_one_or_none()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found in this business",
        )

    sale_date_val = payload.sale_date or date.today()

    sale = SaleRecord(
        business_id=business_id,
        product_id=product.id,
        quantity=payload.quantity,
        unit_price=product.price,
        unit_cost=product.cost_price,
        discount_amount=payload.discount_amount,
        is_debt=payload.is_debt,
        sale_date=sale_date_val,
        notes=payload.notes,
    )
    db.add(sale)

    # Adjust inventory if tracked
    if product.stock_quantity is not None:
        product.stock_quantity -= payload.quantity
        db.add(product)

    await db.commit()
    await db.refresh(sale)
    return sale


async def list_sales(
    business_id: int, current_user: User, db: AsyncSession, start_date: date | None = None, end_date: date | None = None
) -> list[SaleRecord]:
    # Verify business ownership
    await get_business(business_id, current_user, db)

    stmt = select(SaleRecord).where(SaleRecord.business_id == business_id)
    if start_date:
        stmt = stmt.where(SaleRecord.sale_date >= start_date)
    if end_date:
        stmt = stmt.where(SaleRecord.sale_date <= end_date)
        
    stmt = stmt.order_by(SaleRecord.sale_date.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())
