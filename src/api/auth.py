from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from ..db.user_repo import login as user_repo_login
from ..db.user_repo import register as user_repo_register
from ..schemas.user import Token, UserRegister

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(payload: UserRegister):
    return await user_repo_register(payload)


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return await user_repo_login(form_data)
