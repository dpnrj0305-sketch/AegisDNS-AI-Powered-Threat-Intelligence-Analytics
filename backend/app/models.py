from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from app.db import Base


class DNSLog(Base):
    __tablename__ = "dns_logs"

    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String(255), index=True, nullable=False)
    tld = Column(String(32), nullable=False)
    prediction = Column(String(16), nullable=False)
    score = Column(Float, nullable=False)
    entropy = Column(Float, nullable=False)
    digit_count = Column(Integer, nullable=False)
    domain_length = Column(Integer, nullable=False)
    explanation = Column(String(255), nullable=False)
    shap_summary = Column(Text, nullable=False)
    source = Column(String(64), default="manual", nullable=False)
    client_ip = Column(String(64), nullable=True)
    query_type = Column(String(16), default="A", nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
