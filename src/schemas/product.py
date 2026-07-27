from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    cost_price: float = 0.0
    unit: str | None = None
    stock_quantity: int | None = None


class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    cost_price: float | None = None
    unit: str | None = None
    stock_quantity: int | None = None
    is_active: bool | None = None


class ProductResponse(BaseModel):
    id: int
    business_id: int
    name: str
    description: str
    price: float
    cost_price: float
    unit: str | None = None
    stock_quantity: int | None = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
