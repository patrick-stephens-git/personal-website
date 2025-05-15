# models.py (table definitions)

from sqlalchemy import Column, Integer, String, Text, DateTime, Date
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime, timezone

# This sets up a base class for model definitions
Base = declarative_base() # Base is how SQLAlchemy knows which tables to create

# Define your chat_logs table as a Python class
class ChatLog(Base):
    __tablename__ = 'chat_logs'  # Name of the table in PostgreSQL
    # Define the columns in the SQLAlchemy model (table) 
    id = Column(Integer, primary_key=True) # auto-incrementing ID
    date = Column(Date, nullable=False) # stores the date, e.g: 2025-05-15
    user_id = Column(String, nullable=False) # IP address of user
    device = Column(String, nullable=False) # device type
    prompt = Column(Text, nullable=False) # user prompt
    response = Column(Text, nullable=False) # LLM response
    timestamp = Column(DateTime(timezone=True), # timestamp will store timezone information (important for consistency if users are global)
                                default=lambda: datetime.now(timezone.utc)) # function to generate the current UTC timestamp; "lambda:" is used so that the function is called at the exact moment a new row is being created.