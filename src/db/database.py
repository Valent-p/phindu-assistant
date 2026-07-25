# src/database.py
from sqlalchemy import event
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from ..core.config import settings

# Create a non-blocking asynchronous engine
# timeout=30.0 gives busy transactions time to clear before failing
engine = create_async_engine(
    settings.DATABASE_URL,
    connect_args={"timeout": 30.0},
)


# SQLite doesn't enable foreign keys or WAL mode by default.
# This listener applies these performance configurations upon opening a connection.
@event.listens_for(engine.sync_engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON;")
    cursor.execute("PRAGMA journal_mode=WAL;")
    cursor.close()


# Async sessionmaker factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


# Dependency injector function used in HTTP routes
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
