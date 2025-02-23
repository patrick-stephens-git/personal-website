from dotenv import load_dotenv
import os

# Load the environment variables
load_dotenv('.env')
openai_api_key: str = os.getenv("OPENAI_API_KEY")