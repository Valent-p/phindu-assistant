from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProductCreate(BaseModel):
    name: str
    price: float
    description: str


class ProductResponse(BaseModel):
    id: int
    user_id: int
    name: str
    price: float
    description: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProductInstanceCreate(BaseModel):
    product_id: int
    quantity: int
    price_override: float | None = None
    is_debt: bool = False


class ProductInstanceResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    price_override: float | None = None
    is_debt: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
