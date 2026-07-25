from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_verified: bool
    email_verified_at: datetime | None = None
    is_active: bool
    is_deleted: bool
    last_login_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    # This tells Pydantic to read the data even if it's an SQLAlchemy ORM model
    model_config = ConfigDict(from_attributes=True)


class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
