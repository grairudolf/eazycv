# EazyCV

Minimal full‑stack CV builder — FastAPI backend, React frontend. Local demo mode uses SQLite. Optional AI summary optimization via Google Gemini.

How it works
- Frontend submits CV JSON to backend endpoints.
- Backend persists CVs and exposes `/cvs/{id}/optimize` to rewrite summaries via Gemini.

Quick start
- Backend (PowerShell):

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- Frontend (project root):

```powershell
cd react-app
npm install
npm run dev
```

Tests & CI
- Run tests locally: `pip install -r backend/requirements.txt && pytest -q backend/tests`
- GitHub Actions runs tests via `.github/workflows/python-tests.yml` on push/PR.

License
- MIT

Project layout
```
backend/
react-app/
    src/  (React app)
```

Files of interest: `backend/main.py`, `backend/requirements.txt`, `backend/services/`, `react-app/src/`.



EazyCV is a full-stack web application that transforms a traditional, frontend-only CV builder into a modern, production-ready solution. It leverages a powerful backend built with FastAPI to handle all business logic, while Supabase provides robust authentication and database services in the original architecture. The application also integrates Google's Gemini API to offer AI-powered CV optimization, helping users create professional, ATS-friendly resumes.

For local development, this repository now ships with a **Supabase-free demo mode**:
- No external authentication or database is required.
- All CVs are stored in a local SQLite database.
- A single demo user is used behind the scenes, and login/sign-up are implemented on the frontend only.

## Getting Started

Follow these steps to set up the project locally.

### 1. Backend Setup

1.  **Install Dependencies:**
    ```bash
    pip install -r backend/requirements.txt
    ```

2.  **Configure Environment Variables:**
    - Create a `.env` file in the `backend` directory.
    - You can copy the example file:
      ```bash
      cp backend/.env.example backend/.env
      ```
    - **Important:** Open `backend/.env` and add your valid **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

3.  **Run the Backend Server:**
    ```bash
    cd backend
    python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
    The backend will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup

1.  **Serve the Frontend:**
    You can use Python's built-in HTTP server or any other static file server.
    ```bash
    cd frontend
    python -m http.server 3000
    ```
    The application will be available at `http://localhost:3000`.

### 3. Database Inspection

You can inspect the local SQLite database using the provided helper script:

```bash
# List all CVs in the database
python backend/manage_db.py list

# Clear the database (delete all CVs)
python backend/manage_db.py clear
```

## High-Level Architecture

The application is designed as a decoupled full-stack project, with a clear separation of concerns between the frontend and backend.

- **Frontend:** A thin client built with vanilla HTML, CSS, and JavaScript. It is responsible for user interaction and rendering data provided by the backend.
- **Backend:** A RESTful API built with Python and FastAPI. It manages all business logic, including authentication (in the original Supabase-based design), CV data persistence, and the AI optimization workflow.
- **Authentication (original design):** Handled by the Supabase JS SDK on the frontend and verified via JWTs on the backend.
- **Database:** A PostgreSQL database managed by Supabase in production, with a local SQLite option for development.
- **AI Service:** CV content is optimized by making secure, server-to-server calls to the Google Gemini API.

---

## Folder Structure

The project is organized into two main directories: `frontend` and `backend`.

### Frontend Folder Tree

The frontend is structured to keep pages, styles, scripts, and assets clearly separated, allowing it to scale cleanly.

```
# EazyCV

Minimal full‑stack CV builder: FastAPI backend, React frontend. Local demo mode uses SQLite. Optional AI summary optimization via Google Gemini.

Quick start
- Backend (PowerShell):

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- Frontend (project root):

```powershell
cd react-app
npm install
npm run dev
```

Tests & CI
- Run backend tests locally: `pip install -r backend/requirements.txt && pytest -q backend/tests`
- CI: `.github/workflows/python-tests.yml` runs tests on push/PR.

License: MIT

Files of interest: `backend/main.py`, `backend/services/`, `backend/requirements.txt`, `react-app/src/`.

Folder overview
```
backend/
react-app/
```
---

What this repo is
- Small, production-ready CV builder: frontend collects CV data; backend persists it and offers an AI-driven summary optimizer.

Core components
- `react-app/` — React frontend (UI, form, export).
- `backend/` — FastAPI service, SQLAlchemy models, Gemini integration.

Quick start (backend)
1. Create and activate venv (PowerShell):

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Quick start (frontend)
```powershell
cd react-app
npm install
npm run dev
```

Testing
- Run backend tests: `pip install -r backend/requirements.txt && pytest -q backend/tests`
- CI: see `.github/workflows/python-tests.yml` (runs on push/PR).

Files to inspect
- `backend/main.py`, `backend/services/`, `backend/requirements.txt`, `react-app/src/`.

License
- MIT

Contact
- Open issues or PRs for changes.

python -m venv venv
.\venv\Scripts\Activate.ps1
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be accessible at `http://localhost:8000`.

#### Generic steps

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment and activate it:**
    - On Unix/macOS:
      ```bash
      python -m venv venv
      source venv/bin/activate
      ```
    - On Windows (PowerShell):
      ```powershell
      python -m venv venv
      .\venv\Scripts\Activate.ps1
      ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure environment variables:**
    - Create a file named `.env` in the `backend` directory.
    - For local demo mode, you only need your Gemini key:
    ```
    # .env
    GEMINI_API_KEY=your-gemini-api-key
    ```

5.  **Run the backend server:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The API will be accessible at `http://localhost:8000`.

### Frontend Setup

1.  **(Optional) Configure branding/content:**
    - Update text and images in `frontend/index.html`, `login.html`, and `signup.html` to match your project.

2.  **Start the frontend development server:**
    - Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
    - Run a simple HTTP server:
    ```bash
    python -m http.server 8080
    ```
    The frontend will be accessible at `http://localhost:8080`.
