# models.py - Database model
from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from .db import Base

class Run(Base):
    __tablename__ = "runs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, nullable=True)
    csv_text = Column(Text, nullable=False)
    created = Column(DateTime, default=datetime.utcnow)
