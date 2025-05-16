import os
from dotenv import load_dotenv

# paths to the source doc and vector store
DOC_PATH: str = "documents/source.pdf"
VECTOR_STORE_PATH: str = "vector_store/faiss_index"

# limits
response_token_limit: int = 200

# Load the environment variables
load_dotenv('.env')
OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
RECAPTCHA_SECRET_KEY: str = os.getenv("RECAPTCHA_SECRET_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")