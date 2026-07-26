from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


# A specific sale event — one line item per product per transaction.
class SaleRecord(Base):
    __tablename__ = "sale_records"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    business_id: Mapped[int] = mapped_column(ForeignKey("businesses.id"), index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), index=True)

    quantity: Mapped[int] = mapped_column(Integer)

    # Snapshot prices at time of sale — these never change even if product prices update
    unit_price: Mapped[float] = mapped_column(Float)   # actual selling price per unit
    unit_cost: Mapped[float] = mapped_column(Float)    # vendor cost per unit at sale time

    discount_amount: Mapped[float] = mapped_column(Float, server_default="0.0")

    # Credit sale — customer owes the vendor
    is_debt: Mapped[bool] = mapped_column(Boolean, server_default="0")

    # Business date of the sale (may differ from created_at for back-dated entries)
    sale_date: Mapped[date] = mapped_column(Date, index=True)
    notes: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    # ---------------------------------------------------------------------------
    # Computed properties — used by Pydantic schemas via from_attributes=True
    # ---------------------------------------------------------------------------

    @property
    def revenue(self) -> float:
        """Total revenue for this sale line (after discount)."""
        return round(self.quantity * self.unit_price - self.discount_amount, 4)

    @property
    def cogs(self) -> float:
        """Cost of goods sold for this sale line."""
        return round(self.quantity * self.unit_cost, 4)

    @property
    def gross_profit(self) -> float:
        """Gross profit for this sale line."""
        return round(self.revenue - self.cogs, 4)
