import os
from dotenv import load_dotenv


load_dotenv()
class Settings:
# Database
 DATABASE_URL: str = os.getenv("DATABASE_URL")
# JWT
SECRET_KEY: str = os.getenv("SECRET_KEY")
ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Payment
CHAPA_SECRET_KEY: str = os.getenv("CHAPA_SECRET_KEY", "")
STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")

# AI
OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
# CORS
FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

settings = Settings()