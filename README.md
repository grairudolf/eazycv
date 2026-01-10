# EazyCV: AI-Powered Full-Stack CV Builder

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
frontend/
├── cv.html             # Page to display the generated CV
├── form.html           # Page for CV data input
├── index.html          # Landing/home page with auth modals
├── login.html          # Standalone login page
├── signup.html         # Standalone sign-up page
├── images/
│   └── logo.png        # Application assets
├── js/
│   ├── cv.js           # Logic for the CV display page
│   ├── form.js         # Logic for the CV form submission
│   ├── home.js         # Script for the home page modals and footer
│   ├── home-auth.js    # Login/sign-up behaviour for home-page modals
│   ├── login.js        # Login behaviour for login.html
│   └── signup.js       # Sign-up behaviour for signup.html
└── styles/
    ├── cv.css          # Styles for the CV display page
    ├── form.css        # Styles for the form page
    ├── home.css        # Styles for the home page
    └── login.css       # Styles for login/signup pages
```

### Backend Folder Tree

The backend follows a modular and scalable structure, separating concerns into distinct services, data models, and database logic.

```
backend/
├── main.py             # FastAPI application entry point
├── requirements.txt    # Python package dependencies
├── .env                # Environment variables (Gemini key and optional future config)
├── database/
│   ├── database.py     # SQLAlchemy engine and session setup (SQLite by default)
│   └── supabase.py     # Legacy Supabase client placeholder (not used in local mode)
├── models/
│   └── cv.py           # SQLAlchemy ORM models for the database schema
├── schemas/
│   └── cv.py           # Pydantic schemas for data validation and serialization
└── services/
    ├── auth.py         # Demo-mode auth helper (single fixed user)
    ├── cv.py           # Business logic for CV operations
    └── gemini.py       # Logic for interacting with the Gemini API
```

---

## API & Data Flow

The application flow is designed around a decoupled frontend and backend, with two modes of operation:

- **Original Supabase-backed mode** (described in the original tutorial): full auth via Supabase and JWT verification on the backend.
- **Local demo mode (current default in this repo):** no external auth provider, a single demo user, and purely local storage.

### Local demo mode (default)

1.  **Authentication & session:**
    - Login and sign-up pages are implemented entirely on the frontend.
    - When a user logs in or signs up, a simple flag and email are stored in `localStorage`.
    - All requests are treated as belonging to a single demo user on the backend.

2.  **CV Submission:**
    - The user fills out the CV form on the `form.html` page.
    - Upon submission, `form.js` sends a `POST` request to the backend's `/cvs/` endpoint with JSON data only (no auth header).

3.  **AI Optimization:**
    - On the `cv.html` page, the user can click the "Optimize with AI" button.
    - The frontend sends a `POST` request to the `/cvs/{cv_id}/optimize` endpoint.
    - The backend retrieves the CV data, sends it to the Gemini API for optimization, and stores the enhanced text in the database.
    - The updated CV data (including the optimized summary) is returned to the frontend.

4.  **CV Retrieval & Display:**
    - When the `cv.html` page loads, it retrieves the current CV ID from `localStorage`.
    - It sends a `GET` request to the `/cvs/{cv_id}` endpoint.
    - The backend fetches the CV data from the database and returns it as a JSON response.
    - The `cv.js` script parses the JSON and dynamically renders the CV content on the page.

5.  **CV Download (PDF export):**
    - On `cv.html`, the "Download / Print PDF" button exports the rendered CV to a PDF using `html2canvas` and `jsPDF` in the browser.
    - The PDF reflects the on-screen layout of the `#cv-page` element so users can download their CV without using the browser's print dialog.

---

## Database

### Which database is used?

For local development EazyCV uses a **file-based SQLite database**. The connection is configured in `backend/database/database.py` as:

```python
DATABASE_URL = "sqlite:///./eazycv.db"
```

This creates (or reuses) a file named `eazycv.db` in the project root directory. All CVs are stored in the `cvs` table defined by `backend/models/cv.py`.

### Inspecting and manipulating the database

You have a few options:

1. **Using the sqlite3 CLI** (if installed on your system):

   ```powershell
   cd C:\Users\Rudolf\Downloads\eazycv
   sqlite3 eazycv.db
   .tables
   PRAGMA table_info(cvs);
   SELECT id, user_id, personal, experience, education, skills FROM cvs LIMIT 5;
   ```

   From there you can run standard SQL queries to inspect or modify data. Be careful when editing data directly.

2. **Using Python and SQLAlchemy models**:

   ```powershell
   cd backend
   ..\backend\venv\Scripts\python.exe
   ```

   Then inside the Python shell:

   ```python
   from database.database import SessionLocal
   from models.cv import CV

   db = SessionLocal()
   print(db.query(CV).count())           # how many CVs
   for cv in db.query(CV).limit(5):
       print(cv.id, cv.user_id, cv.personal.get("name"))
   db.close()
   ```

   You can also use normal SQLAlchemy operations here to update or delete rows if needed.

---

## Users and authentication

### Users in local demo mode

In local demo mode, the backend uses a **single fixed demo user ID** internally. All CVs are associated with this user, regardless of who is "logged in" on the frontend. This keeps the setup simple and avoids managing real accounts.

The `GET /users/` endpoint returns the distinct `user_id` values that have saved CVs. In demo mode this will typically look like:

```json
[
  { "user_id": "00000000-0000-0000-0000-000000000001" }
]
```

If you later extend the app to support multiple users, this endpoint will return more IDs.

### Authentication pages and validation

Authentication is implemented entirely on the frontend using `localStorage`. The pages are:

- `index.html` modals (home page)
- `login.html` standalone login page
- `signup.html` standalone sign-up page

All three share the same validation rules:

- **Email**
  - Required.
  - Must match a basic pattern: `name@example.com` (checked with a simple regular expression).
- **Password**
  - Required.
  - Must be at least 6 characters long.
- **Confirm password** (sign-up only)
  - Required on sign-up forms.
  - Must exactly match the password field.

On `login.html` and `signup.html`, validation errors are shown inline (`#error-message` or `#message`). On the home page modals, validation errors are shown via `alert(...)` so they are immediately visible even in a small dialog.

When validation passes:

- `localStorage.eazycv_logged_in` is set to `"true"`.
- `localStorage.eazycv_user_email` is set to the entered email.
- The user is redirected to `form.html`.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Python 3.9+
- A Google Gemini API key (only required if you want to use the "Optimize with AI" feature).

Supabase and PostgreSQL are **not required** for the default local demo mode.

### Backend Setup

#### Quickstart (Windows / PowerShell)

From the project root:

```powershell
cd backend
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
