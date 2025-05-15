from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from config import DATABASE_URL

# Set up the engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, # requires you to manually call .commit() to save changes
                            autoflush=False, # prevents automatic flushing of changes before queries; flushing is the process where SQLAlchemy synchronizes your in-memory changes to the database by sending SQL INSERT, UPDATE, or DELETE statements without committing the transaction yet
                            bind=engine # binds the session to your database connection (engine)
                            )

# Function to initialize the tables
def init_db(): # function that creates tables before starting the app (does NOT delete or drop existing tables, it only creates tables that do NOT already exist)
    Base.metadata.create_all(bind=engine) # reads all model definitions and generates the appropriate CREATE TABLE SQL statements