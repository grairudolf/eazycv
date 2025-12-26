# EazyCV Backend

This directory contains the backend code for the EazyCV application, built with Python and FastAPI.

## Overview

The backend is a RESTful API that serves as the core business logic layer for the EazyCV application. It is designed to be completely decoupled from the frontend, returning structured JSON responses only.

### Core Responsibilities

-   **REST API:** Exposes a set of endpoints for creating, retrieving, and managing CV data.
-   **Authentication:** Verifies Supabase JWTs on all protected routes to ensure that only authenticated users can access their data.
-   **Database Interaction:** Uses SQLAlchemy to interact with the database (PostgreSQL in production, SQLite for local development) for all data persistence.
-   **AI Integration:** Communicates securely with the Google Gemini API to perform AI-powered CV optimization.

## Structure

-   **`main.py`:** The entry point for the FastAPI application, where all routes are defined.
-   **`/database`:** Contains the database connection and session management logic.
-   **`/models`:** Defines the SQLAlchemy ORM models, which represent the database schema.
-   **`/schemas`:** Contains the Pydantic models used for data validation and serialization.
-   **`/services`:** Holds the core business logic for authentication, CV management, and AI integration.

For detailed information about the project architecture, API flow, and setup instructions, please refer to the main `README.md` file in the root project directory.
