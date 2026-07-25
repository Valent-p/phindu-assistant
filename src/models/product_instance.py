from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


# A specific instance of a product that has been sold.
class ProductInstance(Base):
    __tablename__ = "product_instances"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))

    # In case its sold higher or lower, i.g. on discount.
    price_override: Mapped[float] = mapped_column(Float, nullable=True)

    # The quantity of the product that has been sold.
    quantity: Mapped[int] = mapped_column(Integer)

    # Not sure if this is needed.
    is_debt: Mapped[bool] = mapped_column(Boolean, server_default="0")

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
