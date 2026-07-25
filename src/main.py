from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Phindu Assistant API is running!"}
