# EazyCV Frontend

This directory contains the frontend code for the EazyCV application.

## Overview

The frontend is a lightweight, client-side application built with vanilla HTML, CSS, and JavaScript. It is designed to be a "thin client," meaning it contains no business logic. Its primary responsibilities are:

-   **User Interface:** Rendering the login, registration, CV form, and final CV pages.
-   **User Authentication:** Interacting with the Supabase JS SDK to handle user login and session management.
-   **API Communication:** Sending authenticated requests to the backend REST API to create, retrieve, and optimize CVs.
-   **Data Rendering:** Displaying the data returned from the backend in a user-friendly format.

## Structure

-   **HTML Files:** (`index.html`, `login.html`, `form.html`, `cv.html`) define the structure of the different pages.
-   **`/js`:** Contains the JavaScript files responsible for handling user interactions and API calls.
-   **`/styles`:** Holds all the CSS files for styling the application.
-   **`/images`:** Stores static assets like logos.

For detailed information about the project architecture, API flow, and setup instructions, please refer to the main `README.md` file in the root project directory.
