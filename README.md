<<<<<<< HEAD
# AI-Powered DNS Analytics Dashboard

This workspace contains a FastAPI backend and a Next.js frontend for a real-time AI-powered DNS analytics dashboard.

## Backend
- `backend/app/main.py` - FastAPI app with `/analyze`, `/logs`, and `/ws`
- `backend/app/ml_engine.py` - Lexical feature extraction, mock RandomForest classifier, and SHAP-style explainability
- `backend/app/models.py` - SQLAlchemy SQLite model ready for Pi-hole FTL-style ingestion
- `backend/app/db.py` - SQLite database setup

### Run backend
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend
- `frontend/app/page.tsx` - Futuristic command center UI
- `frontend/components/` - reusable metrics, chart, logs, and badge components
- `frontend/globals.css` - dark neon styles with Tailwind utility overrides

### Run frontend
```bash
cd frontend
npm install
npm run dev
```

## Notes
- WebSocket events stream new DNS logs to the dashboard at `ws://localhost:8000/ws`
- The SQLAlchemy schema is prepared to accept richer DNS metadata for future Pi-hole or FTL ingestion
=======
# AI-Powered DNS Analytics Dashboard

This workspace contains a FastAPI backend and a Next.js frontend for a real-time AI-powered DNS analytics dashboard.

## Backend
- `backend/app/main.py` - FastAPI app with `/analyze`, `/logs`, and `/ws`
- `backend/app/ml_engine.py` - Lexical feature extraction, mock RandomForest classifier, and SHAP-style explainability
- `backend/app/models.py` - SQLAlchemy SQLite model ready for Pi-hole FTL-style ingestion
- `backend/app/db.py` - SQLite database setup

### Run backend
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend
- `frontend/app/page.tsx` - Futuristic command center UI
- `frontend/components/` - reusable metrics, chart, logs, and badge components
- `frontend/globals.css` - dark neon styles with Tailwind utility overrides

### Run frontend
```bash
cd frontend
npm install
npm run dev
```

## Notes
- WebSocket events stream new DNS logs to the dashboard at `ws://localhost:8000/ws`
- The SQLAlchemy schema is prepared to accept richer DNS metadata for future Pi-hole or FTL ingestion
>>>>>>> 7986519b442295d2fa5172a3c4d2b253620841e9
