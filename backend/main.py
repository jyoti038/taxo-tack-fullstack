# main.py - FastAPI backend
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import pandas as pd
from io import StringIO

from .db import SessionLocal, init_db
from .models import Run

# Initialize DB
init_db()

app = FastAPI(title="Taxo-Track API")

# Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def aggregate_taxa_df(df: pd.DataFrame, top_n=20):
    if not {"sample", "taxonomy", "count"}.issubset(df.columns):
        raise ValueError("CSV must have columns: sample, taxonomy, count")
    df["count"] = pd.to_numeric(df["count"], errors="coerce").fillna(0)
    agg = df.groupby("taxonomy", as_index=False)["count"].sum().sort_values("count", ascending=False)
    return agg.head(top_n)

@app.get("/")
def root():
    return {"message": "Taxo-Track API running"}

@app.post("/upload/")
async def upload_run(file: UploadFile = File(...), name: str = Form(None)):
    content = await file.read()
    text = content.decode("utf-8")
    try:
        df = pd.read_csv(StringIO(text))
        agg = aggregate_taxa_df(df, top_n=100)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing CSV: {e}")

    # Save run
    db = next(get_db())
    run = Run(name=name, csv_text=text)
    db.add(run)
    db.commit()
    db.refresh(run)

    return {"run_id": run.id, "rows": len(df), "top_taxa": agg.to_dict(orient="records")}

@app.get("/runs/")
def list_runs():
    db = next(get_db())
    runs = db.query(Run).order_by(Run.created.desc()).all()
    return [{"id": r.id, "name": r.name, "created": r.created.isoformat()} for r in runs]

@app.get("/runs/{run_id}")
def get_run(run_id: int):
    db = next(get_db())
    run = db.query(Run).filter(Run.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    df = pd.read_csv(StringIO(run.csv_text))
    agg = aggregate_taxa_df(df, top_n=500)
    return {
        "id": run.id,
        "name": run.name,
        "created": run.created.isoformat(),
        "top_taxa": agg.to_dict(orient="records"),
    }
