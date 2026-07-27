from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class ExpenseCreate(BaseModel):
    amount: float
    category: str
    description: str
    expense_date: date | None = None
    is_recurring: bool = False
    notes: str | None = None


class ExpenseUpdate(BaseModel):
    amount: float | None = None
    category: str | None = None
    description: str | None = None
    expense_date: date | None = None
    is_recurring: bool | None = None
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
