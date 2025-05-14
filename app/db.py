import psycopg2
from config import DATABASE_URL

# Set up a reusable database connection function
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn