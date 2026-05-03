from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json
from analyzer import analyze_single_paper, generate_full_analysis
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="Past Paper Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(
    files: List[UploadFile] = File(...),
    years: str = Form(""),
    syllabus: str = Form(""),
):
    try:
        years_list = [y.strip() for y in years.split(",") if y.strip()]
        all_paper_data = []

        for i, file in enumerate(files):
            content = await file.read()
            year = years_list[i] if i < len(years_list) else str(2024 - i)
            paper_data = analyze_single_paper(content, file.filename, year)
            all_paper_data.append(paper_data)

        analysis = generate_full_analysis(all_paper_data, syllabus)
        return {
            "papers": all_paper_data,
            "analysis": analysis,
            "total_papers": len(all_paper_data)
        }
    except json.JSONDecodeError as e:
        raise HTTPException(400, f"AI returned invalid JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(500, str(e))