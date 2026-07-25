# src/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Phindu Assistant"
    DEBUG: bool = True
    DATABASE_URL: str = "sqlite+aiosqlite:///phindudb.db"
    JWT_SECRET_KEY: str = "replace-this-with-a-secure-random-hex-string"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    # Configures the settings loader to check for an ".env" file
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
