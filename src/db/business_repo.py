from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.business import Business
from ..models.user import User
from ..schemas.business import BusinessCreate, BusinessUpdate


async def create_business(
    payload: BusinessCreate, current_user: User, db: AsyncSession
) -> Business:
    business = Business(
        owner_id=current_user.id,
        name=payload.name,
        description=payload.description,
        industry=payload.industry,
        currency=payload.currency,
        logo_url=payload.logo_url,
    )
    db.add(business)
    await db.commit()
    await db.refresh(business)
    return business


async def list_businesses(current_user: User, db: AsyncSession) -> list[Business]:
    stmt = select(Business).where(Business.owner_id == current_user.id)
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_business(
    business_id: int, current_user: User, db: AsyncSession
) -> Business:
    stmt = select(Business).where(
        Business.id == business_id, Business.owner_id == current_user.id
    )
    result = await db.execute(stmt)
    business = result.scalar_one_or_none()
    
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found or access denied",
        )
    return business


async def update_business(
    business_id: int, payload: BusinessUpdate, current_user: User, db: AsyncSession
) -> Business:
    business = await get_business(business_id, current_user, db)
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(business, key, value)
        
    db.add(business)
    await db.commit()
    await db.refresh(business)
    return business
