from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, HttpUrl


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    is_public: bool
    is_verified: bool
    email_verified_at: datetime | None = None
    is_active: bool
    is_deleted: bool
    last_login_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserPublicProfile(BaseModel):
    username: str
    first_name: str | None = None
    last_name: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    is_public: bool | None = None
    username: str | None = None


class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
