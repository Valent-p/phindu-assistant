from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field

from ..models.expense_record import EXPENSE_CATEGORIES


class ExpenseCreate(BaseModel):
    amount: float = Field(gt=0)
    category: str
    description: str
    expense_date: date | None = None
    is_recurring: bool = False
    notes: str | None = None


class ExpenseResponse(BaseModel):
    id: int
    business_id: int
    amount: float
    category: str
    description: str
    expense_date: date
    is_recurring: bool
    notes: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ExpenseCategoriesResponse(BaseModel):
    categories: list[str] = list(EXPENSE_CATEGORIES)
