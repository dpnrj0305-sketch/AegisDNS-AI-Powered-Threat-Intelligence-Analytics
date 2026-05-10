import asyncio
from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app import models, schemas
from app.db import SessionLocal, init_db
from app.ml_engine import DomainAnalyzer

app = FastAPI(title="AI DNS Analytics Command Center")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analyzer = DomainAnalyzer()
active_websockets: list[WebSocket] = []
broadcast_lock = asyncio.Lock()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
async def startup_event() -> None:
    init_db()


@app.get("/")
def root() -> dict:
    return {"status": "ok", "message": "AI DNS Analytics backend is running", "docs": "/docs"}


async def broadcast_new_log(payload: dict) -> None:
    async with broadcast_lock:
        stale: list[WebSocket] = []
        for websocket in active_websockets:
            try:
                await websocket.send_json(payload)
            except Exception:
                stale.append(websocket)
        for websocket in stale:
            active_websockets.remove(websocket)


@app.post("/analyze", response_model=schemas.AnalyzeResponse)
async def analyze_domain(request: schemas.AnalyzeRequest, db: Session = Depends(get_db)) -> dict:
    data = analyzer.analyze(request.domain)
    log = models.DNSLog(
        domain=data["domain"],
        tld=data["tld"],
        prediction=data["prediction"],
        score=data["score"],
        entropy=data["entropy"],
        digit_count=data["digit_count"],
        domain_length=data["domain_length"],
        explanation=data["explanation"],
        shap_summary=data["shap_summary"],
        source="api",
        client_ip=None,
        query_type="A",
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    payload = {
        "id": log.id,
        "domain": log.domain,
        "prediction": log.prediction,
        "score": log.score,
        "created_at": log.created_at.isoformat(),
        "tld": log.tld,
        "explanation": log.explanation,
    }
    await broadcast_new_log(payload)
    return data


@app.get("/logs", response_model=list[schemas.DNSLogRead])
def read_logs(db: Session = Depends(get_db)) -> list[models.DNSLog]:
    logs = (
        db.query(models.DNSLog)
        .order_by(models.DNSLog.created_at.desc())
        .limit(50)
        .all()
    )
    return logs


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await websocket.accept()
    active_websockets.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        if websocket in active_websockets:
            active_websockets.remove(websocket)
