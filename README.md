# EazyCV: AI-Powered Full-Stack CV Builder

EazyCV is a full-stack web application that transforms a traditional, frontend-only CV builder into a modern, production-ready solution. It leverages a powerful backend built with FastAPI to handle all business logic, while Supabase provides robust authentication and database services. The application also integrates Google's Gemini API to offer AI-powered CV optimization, helping users create professional, ATS-friendly resumes.

## High-Level Architecture

The application is designed as a decoupled full-stack project, with a clear separation of concerns between the frontend and backend.

- **Frontend:** A thin client built with vanilla HTML, CSS, and JavaScript. It is responsible for user interaction and rendering data provided by the backend.
- **Backend:** A RESTful API built with Python and FastAPI. It manages all business logic, including user authentication, CV data persistence, and the AI optimization workflow.
- **Authentication:** Handled by the Supabase JS SDK on the frontend and verified via JWTs on the backend.
- **Database:** A PostgreSQL database managed by Supabase, with a local SQLite option for development.
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
├── index.html          # Landing/home page
├── login.html          # User login page
├── signup.html         # User registration page
├── images/
│   └── logo.png        # Application assets
├── js/
│   ├── cv.js           # Logic for the CV display page
│   ├── form.js         # Logic for the CV form submission
│   ├── helpers.js      # Utility functions
│   ├── home.js         # Script for the home page
│   └── login.js        # Handles Supabase authentication
└── styles/
    ├── cv.css          # Styles for the CV display page
    ├── form.css        # Styles for the form page
    ├── global.css      # Sitewide styles
    ├── home.css        # Styles for the home page
    └── login.css       # Styles for login/signup pages
```

### Backend Folder Tree

The backend follows a modular and scalable structure, separating concerns into distinct services, data models, and database logic.

```
backend/
├── main.py             # FastAPI application entry point
├── requirements.txt    # Python package dependencies
├── .env                # Environment variables (Supabase, Gemini keys)
├── database/
│   ├── database.py     # SQLAlchemy engine and session setup
│   └── supabase.py     # Supabase client initialization
├── models/
│   └── cv.py           # SQLAlchemy ORM models for the database schema
├── schemas/
│   └── cv.py           # Pydantic schemas for data validation and serialization
└── services/
    ├── auth.py         # Handles Supabase JWT validation
    ├── cv.py           # Business logic for CV operations
    └── gemini.py       # Logic for interacting with the Gemini API
```

---

## API & Data Flow

The application flow is designed to be secure and efficient, with the frontend acting as a presentation layer and the backend handling all core logic.

1.  **Authentication:**
    - A user signs up or logs in on the frontend using their email and password.
    - The Supabase JS SDK communicates directly with Supabase to authenticate the user and receives a JWT.
    - This JWT is stored in the browser's `localStorage`.

2.  **CV Submission:**
    - The authenticated user fills out the CV form on the `form.html` page.
    - Upon submission, `form.js` sends a `POST` request to the backend's `/cvs/` endpoint, including the JWT in the `Authorization` header.
    - The backend verifies the JWT using the `auth.py` service. If valid, it processes and stores the CV data in the database.

3.  **AI Optimization:**
    - On the `cv.html` page, the user can click the "Optimize with AI" button.
    - The frontend sends a `POST` request to the `/cvs/{cv_id}/optimize` endpoint.
    - The backend retrieves the user's CV data, sends it to the Gemini API for optimization, and stores the enhanced text in the database.
    - The updated CV data is returned to the frontend.

4.  **CV Retrieval & Display:**
    - When the `cv.html` page loads, it retrieves the current CV ID from `localStorage`.
    - It sends a `GET` request to the `/cvs/{cv_id}` endpoint with the JWT.
    - The backend validates the token, fetches the CV data from the database, and returns it as a JSON response.
    - The `cv.js` script parses the JSON and dynamically renders the CV content on the page.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Python 3.9+
- An active Supabase account and project credentials.
- A Google Gemini API key.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure environment variables:**
    - Create a file named `.env` in the `backend` directory.
    - Add your Supabase and Gemini credentials to it. For local development, you can use the SQLite configuration by omitting the `DATABASE_URL`.
    ```
    # .env
    SUPABASE_URL=https://your-project-id.supabase.co
    SUPABASE_KEY=your-supabase-anon-key
    GEMINI_API_KEY=your-gemini-api-key
    # DATABASE_URL=postgresql://user:password@host:port/database
    ```

5.  **Run the backend server:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The API will be accessible at `http://localhost:8000`.

### Frontend Setup

1.  **Configure Supabase credentials:**
    - In `frontend/js/login.js`, replace the placeholder Supabase credentials with your actual project URL and anon key.

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
