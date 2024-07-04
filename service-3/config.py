import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class Settings:
    RABBITMQ_URL: str = os.getenv('RABBITMQ_URL')
    

settings = Settings()