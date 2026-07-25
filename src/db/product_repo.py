# Functions to get or set product/product-instance data in the database
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.product import Product
from ..models.product_instance import ProductInstance
from ..models.user import User
from ..schemas.product import ProductCreate, ProductInstanceCreate


async def create_product(
    payload: ProductCreate, current_user: User, db: AsyncSession
) -> Product:
    product = Product(
        user_id=current_user.id,
        name=payload.name,
        price=payload.price,
        description=payload.description,
    )
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product


async def list_products(current_user: User, db: AsyncSession) -> list[Product]:
    stmt = select(Product).where(Product.user_id == current_user.id)
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def create_product_instance(
    payload: ProductInstanceCreate, current_user: User, db: AsyncSession
) -> ProductInstance:
    # Verify the referenced product exists and belongs to this user
    stmt = select(Product).where(
        Product.id == payload.product_id, Product.user_id == current_user.id
    )
    result = await db.execute(stmt)
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found or does not belong to you",
        )

    instance = ProductInstance(
        user_id=current_user.id,
        product_id=payload.product_id,
        quantity=payload.quantity,
        price_override=payload.price_override,
        is_debt=payload.is_debt,
    )
    db.add(instance)
    await db.commit()
    await db.refresh(instance)
    return instance
