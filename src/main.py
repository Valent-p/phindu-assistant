from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.auth import router as auth_router
from .api.product import router as product_router
from .api.user import router as user_router
from .api.transaction import router as transaction_router
from .api.analytics import router as analytics_router
from .api.business import router as business_router
from .db.database import engine
from .models import base  # noqa: F401 — ensures all models are registered
from .models.product import Product  # noqa: F401
from .models.product_instance import ProductInstance  # noqa: F401
from .models.user import User  # noqa: F401
from .models.sale_record import SaleRecord  # noqa: F401
from .models.expense_record import ExpenseRecord  # noqa: F401
from .models.business import Business  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup (idempotent — safe to run every time)
    async with engine.begin() as conn:
        await conn.run_sync(base.Base.metadata.create_all)
    yield


app = FastAPI(title="Phindu Assistant API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(product_router)
app.include_router(transaction_router)
app.include_router(analytics_router)
app.include_router(business_router)


@app.get("/")
async def root():
    return {"message": "Phindu Assistant API is running!"}
