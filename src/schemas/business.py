from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BusinessCreate(BaseModel):
    name: str
    description: str | None = None
    industry: str | None = None
    currency: str = "MWK"


class BusinessUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    industry: str | None = None
    currency: str | None = None
    logo_url: str | None = None


class BusinessResponse(BaseModel):
    id: int
    owner_id: int
    name: str
    description: str | None = None
    industry: str | None = None
    currency: str
    logo_url: str | None = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
