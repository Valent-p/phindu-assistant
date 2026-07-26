from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base

EXPENSE_CATEGORIES = (
    "Rent",
    "Supplies",
    "Transport",
    "Salaries",
    "Utilities",
    "Marketing",
    "Equipment",
    "Other",
)


# A business expense — fixed or variable cost.
class ExpenseRecord(Base):
    __tablename__ = "expense_records"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    business_id: Mapped[int] = mapped_column(ForeignKey("businesses.id"), index=True)

    amount: Mapped[float] = mapped_column(Float)

    # One of EXPENSE_CATEGORIES (validated at schema layer)
    category: Mapped[str] = mapped_column(String(100))

    description: Mapped[str] = mapped_column(String(500))
    expense_date: Mapped[date] = mapped_column(Date, index=True)

    # True = fixed recurring cost (used as fixed cost in break-even analysis)
    is_recurring: Mapped[bool] = mapped_column(Boolean, server_default="0")

    notes: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
