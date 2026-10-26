# ANATOME - Sidharth Mantri, Pranav Arun Pillai, Rishi Tadi
# Note: this code was generated with AI assistance (Claude). See README.

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./anatome.db")

# check_same_thread is a sqlite thing - FastAPI can use the connection from another thread
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
