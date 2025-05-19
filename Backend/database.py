from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Backend.models import Base

DATABASE_URL = "postgresql://postgres:ltCScDPfStabkLPFDixYcIamGkXZKyJU@crossover.proxy.rlwy.net:15267/railway"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base.metadata.create_all(bind=engine)
