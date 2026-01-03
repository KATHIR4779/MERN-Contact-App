# MERN Contact Manager

This small demo shows MERN fundamentals: React frontend, Express backend, MongoDB with Mongoose. It supports creating, listing and deleting contacts.

Quick start

1. Server
   - cd server
   - copy `.env.example` to `.env` and set `MONGO_URI` (e.g., local Mongo or Atlas)
   - npm install
   - npm run dev

2. Client
   - cd client
   - npm install
   - npm run dev

Open the client (default Vite port 3000) and use the form to add contacts.

Notes
- API base is `http://localhost:5000` by default; change via `client/.env` VITE_API_URL if needed. If `localhost:5000` is already bound by another service on Windows, use your machine IP (for example `http://10.153.238.82:5000`).
- Focused on working functionality and simple, readable code for learning.