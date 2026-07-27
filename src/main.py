from contextlib import asynccontextmanager
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from .api.analytics import router as analytics_router
from .api.auth import router as auth_router
from .api.business import router as business_router
from .api.expense import router as expense_router
from .api.product import router as product_router
from .api.sale import router as sale_router
from .api.user import router as user_router
from .api.uploads import router as uploads_router
from .db.database import engine
from .models import base  # noqa: F401
from .models.business import Business  # noqa: F401
from .models.expense_record import ExpenseRecord  # noqa: F401
from .models.product import Product  # noqa: F401
from .models.sale_record import SaleRecord  # noqa: F401
from .models.user import User  # noqa: F401


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

# 1. Mount API routers with /api/v1 prefix
app.include_router(auth_router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1")
app.include_router(business_router, prefix="/api/v1")
app.include_router(product_router, prefix="/api/v1")
app.include_router(sale_router, prefix="/api/v1")
app.include_router(expense_router, prefix="/api/v1")
app.include_router(analytics_router, prefix="/api/v1")
app.include_router(uploads_router, prefix="/api/v1")

# 2. Mount static uploads directory
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 3. Mount frontend dist directory (and fallback)
DIST_DIR = "dist"
if os.path.isdir(DIST_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

@app.get("/{catchall:path}")
async def serve_frontend(catchall: str):
    # Check if the requested file exists in dist
    file_path = os.path.join(DIST_DIR, catchall)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Otherwise, return index.html for React Router to handle
    index_path = os.path.join(DIST_DIR, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
        
    return {"message": "Phindu Assistant API is running! Frontend not built yet."}
