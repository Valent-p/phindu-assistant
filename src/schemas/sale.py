from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class SaleCreate(BaseModel):
    product_id: int
    quantity: int
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
    created_at: datetime
    updated_at: datetime
    
    # Computed fields exposed from ORM model
    revenue: float
    cogs: float
    gross_profit: float

    model_config = ConfigDict(from_attributes=True)
