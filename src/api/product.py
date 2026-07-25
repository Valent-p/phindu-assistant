from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.product_repo import (
    create_product,
    create_product_instance,
    list_products,
)
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.product import (
    ProductCreate,
    ProductInstanceCreate,
    ProductInstanceResponse,
    ProductResponse,
)

router = APIRouter(prefix="/products", tags=["products"])


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product_endpoint(
    payload: ProductCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_product(payload, current_user, db)


@router.get("/", response_model=list[ProductResponse])
async def list_products_endpoint(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_products(current_user, db)


@router.post(
    "/instances",
    response_model=ProductInstanceResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_product_instance_endpoint(
    payload: ProductInstanceCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_product_instance(payload, current_user, db)
