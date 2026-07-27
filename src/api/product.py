from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.database import get_db
from ..db.product_repo import create_product, list_products, update_product
from ..db.user_repo import get_current_user
from ..models.user import User
from ..schemas.product import ProductCreate, ProductResponse, ProductUpdate

router = APIRouter(prefix="/businesses/{business_id}/products", tags=["Products"])


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product_endpoint(
    business_id: int,
    payload: ProductCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await create_product(business_id, payload, current_user, db)


@router.get("/", response_model=list[ProductResponse])
async def list_products_endpoint(
    business_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await list_products(business_id, current_user, db)


@router.patch("/{product_id}", response_model=ProductResponse)
async def update_product_endpoint(
    business_id: int,
    product_id: int,
    payload: ProductUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await update_product(business_id, product_id, payload, current_user, db)
