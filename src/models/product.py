from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


# A blueprint for any kind of product. Owned by a business.
class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    business_id: Mapped[int] = mapped_column(ForeignKey("businesses.id"), index=True)

    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String, nullable=False)

    # Pricing & Cost
    price: Mapped[float] = mapped_column(Float)
    cost_price: Mapped[float] = mapped_column(Float, server_default="0.0")

    # Inventory & Units
    unit: Mapped[str | None] = mapped_column(String(50))  # e.g., kg, piece, litre
    stock_quantity: Mapped[int | None] = mapped_column(Integer)

    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, server_default="1")

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
