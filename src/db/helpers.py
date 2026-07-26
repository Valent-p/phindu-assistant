"""Shared helper: resolve user → business_id (first active business)."""
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.business import Business
from ..models.user import User


async def get_user_business_id(current_user: User, db: AsyncSession) -> int | None:
    result = await db.execute(
        select(Business.id)
        .where(Business.owner_id == current_user.id, Business.is_active)
        .limit(1)
    )
    return result.scalar_one_or_none()
