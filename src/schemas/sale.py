from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class SaleCreate(BaseModel):
    product_id: int
    quantity: int = Field(ge=1)
    unit_price: float | None = None
    discount_amount: float = 0.0
    is_debt: bool = False
    sale_date: date | None = None
    notes: str | None = None


class SaleResponse(BaseModel):
    id: int
    business_id: int
    product_id: int
    quantity: int
    unit_price: float
    unit_cost: float
    discount_amount: float
    is_debt: bool
    sale_date: date
    notes: str | None = None
    revenue: float
    cogs: float
    gross_profit: float
    created_at: datetime
    updated_at: datetime
    product_name: str | None = None

    model_config = ConfigDict(from_attributes=True)
