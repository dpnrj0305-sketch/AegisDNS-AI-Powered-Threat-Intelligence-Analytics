from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    domain: str = Field(..., min_length=1, max_length=255)


class AnalyzeResponse(BaseModel):
    domain: str
    prediction: str
    score: float
    explanation: str
    shap_summary: str
    entropy: float
    digit_count: int
    domain_length: int
    tld: str


class DNSLogRead(BaseModel):
    id: int
    domain: str
    tld: str
    prediction: str
    score: float
    entropy: float
    digit_count: int
    domain_length: int
    explanation: str
    shap_summary: str
    source: str
    client_ip: Optional[str]
    query_type: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
