from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.product import Product
from ..models.user import User
from ..schemas.product import ProductCreate, ProductUpdate
from .business_repo import get_business


async def create_product(
    business_id: int, payload: ProductCreate, current_user: User, db: AsyncSession
) -> Product:
    # Verify business ownership
    await get_business(business_id, current_user, db)

    product = Product(
        business_id=business_id,
        name=payload.name,
        description=payload.description,
        price=payload.price,
        cost_price=payload.cost_price,
        unit=payload.unit,
        stock_quantity=payload.stock_quantity,
        image_url=payload.image_url,
    )
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product


async def list_products(
    business_id: int, current_user: User, db: AsyncSession
) -> list[Product]:
    # Verify business ownership
    await get_business(business_id, current_user, db)

    stmt = select(Product).where(Product.business_id == business_id)
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def update_product(
    business_id: int, product_id: int, payload: ProductUpdate, current_user: User, db: AsyncSession
) -> Product:
    # Verify business ownership
    await get_business(business_id, current_user, db)

    stmt = select(Product).where(Product.id == product_id, Product.business_id == business_id)
    result = await db.execute(stmt)
    product = result.scalar_one_or_none()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found in this business",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
        
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product
