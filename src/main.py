from fastapi import FastAPI

from .api.user import router as user_router

app = FastAPI()

app.include_router(user_router)


@app.get("/")
async def root():
    return {"message": "Phindu Assistant API is running!"}
