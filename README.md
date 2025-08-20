Store Rating Web Application

This is a full-stack web application that allows users to submit ratings for stores registered on the platform. The app supports different user roles, each with access to specific features.

Tech Stack

Backend: Express.js

Database: PostgreSQL

Frontend: React.js

User Roles & Functionalities
1. System Administrator

Add new stores and users (normal and admin).

Dashboard shows total users, stores, and ratings.

View and filter lists of stores and users.

View detailed user information, including store ratings for store owners.

Logout functionality.

2. Normal User

Sign up and log in.

Update password after logging in.

Browse and search stores by name or address.

Submit and modify ratings (1–5) for stores.

View store details including overall rating and their submitted rating.

Logout functionality.

3. Store Owner

Log in and update password.

Dashboard shows users who submitted ratings for their store and the average rating.

Logout functionality.

Form Validations

Name: 20–60 characters

Address: Max 400 characters

Password: 8–16 characters, must include at least one uppercase letter and one special character

Email: Must follow standard email format

Additional Features

Sorting support for tables (ascending/descending) on key fields like name, email, etc.

Role-based access control ensures users see only relevant data.

Follows best practices for backend and frontend development.

Database schema designed for scalability and maintainability.
