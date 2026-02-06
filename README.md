# EazyCV

EazyCV is a full-stack CV builder with a FastAPI backend and a React (Vite) frontend. It stores CVs in a local SQLite database for demo mode and can optionally optimize summaries using Google Gemini.

## Features
- Create and view CVs from a structured form
- AI summary optimization via Gemini
- Local demo mode (no auth required)
- Print-ready CV preview

## Tech Stack
- Backend: FastAPI, SQLAlchemy, SQLite
- Frontend: React + Vite
- AI: Google Gemini (optional)

## Prerequisites
- Python 3.10+
- Node.js 18+

## Quick Start

### 1) Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The API runs at `http://localhost:8000`.

### 2) Frontend
```powershell
cd react-app
npm install
npm run dev
```
The app runs at `http://localhost:5173`.

## Docker (optional)

If you have Docker installed you can build and run both services with one command:

```bash
docker compose up --build
```

Frontend will be available at `http://localhost:5173` and the API at `http://localhost:8000`.

Stop the stack with:

```bash
docker compose down
```

## AI Optimization Setup (Optional)
1. Copy the sample env file:
   ```powershell
   Copy-Item backend\.env.example backend\.env
   ```
2. Add your Gemini API key to `backend/.env`:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   ```

If the key is missing, the `/cvs/{id}/optimize` endpoint returns a 503 with a clear message.

## Configuration
- `GEMINI_API_KEY` (backend) - required for AI summary optimization.
- `GEMINI_MODEL` (backend) - optional override for the Gemini model (default: `gemini-1.5-flash-001`).
- `VITE_API_BASE` (frontend) - optional override for API base URL (defaults to `http://localhost:8000`).

## API Overview
- `POST /cvs/` - create a CV
- `GET /cvs/` - list CVs (demo user)
- `GET /cvs/{id}` - fetch a CV
- `POST /cvs/{id}/optimize` - optimize the summary using Gemini

## Tests
```powershell
python -m pip install -r backend\requirements.txt
python -m pytest -q backend\tests
```

## Project Structure
```
backend/        FastAPI service, models, and AI integration
react-app/      React UI (Vite)
```

## Architecture
- **Frontend (React + Vite)** — multi-page SPA with multi-step CV form, local storage drafts, and Axios-powered `cvService`. It talks to the backend via `/cvs/*` endpoints and renders the preview you download/print; the hero, auth pages, and preview all live inside `react-app/`.
- **Backend (FastAPI + SQLAlchemy)** — exposes REST endpoints for creating, reading, and optimizing CVs. It stores data in SQLite when `DATABASE_URL` is unset, loads `.env`, and delegates AI work to `services/gemini.py`. The `/cvs/{id}/optimize` route rewrites the summary and saves it to `optimized_cv`.
- **AI and persistence flow** — the frontend submits structured JSON (personal info + arrays for experience/education) → backend persists via SQLAlchemy models → optimize endpoint fetches the summary, calls Gemini, and stores the new text → React pulls `optimized_cv` (or the original) and shows the watermark-enabled preview.

## Notes
- Demo mode stores data in `eazycv.db` at the repo root.
- The UI expects the backend to be running while creating or viewing a CV.

## License
MIT
