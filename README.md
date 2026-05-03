# PaperIQ — AI Past Paper Analyzer

> AI-powered exam prep tool that analyzes past papers, ranks topics by importance, and generates a smart study plan.

## Live Demo
🌐 **Live App:** https://paper-iq-ai.vercel.app
🎬 **Demo Video:**  https://drive.google.com/file/d/11AZ-uZX_tw-gukNEV0FnO8bjfs1j3Sm0/view?usp=sharing  

## Backend API
https://paperiq-backend.onrender.com/health

## Features
- Multi-paper upload (PDF + images)
- AI topic extraction 
- Topic importance scoring & ranking
- Syllabus gap detection
- Smart week-by-week study planner
- Practice question generation
- Visual analytics dashboard

## Tech Stack
- **Frontend**: React + Recharts + Vite
- **Backend**: Python FastAPI
- **AI**: Grok

## Setup
```bash
# Backend
cd backend && pip install -r requirements.txt
echo "GROK_API_KEY=your-key" > .env
uvicorn main:app --reload

# Frontend
cd frontend && npm install && npm run dev
```

## Architecture
Upload → FastAPI → Claude Vision/Text extraction → Cross-paper analysis → React Dashboard
