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
- API base is `http://localhost:5000` by default; change via `client/.env` VITE_API_URL if needed. If `localhost:5000` is already bound by another service on Windows, you may use your machine IP for local testing (e.g. `http://<YOUR_MACHINE_IP>:5000`) — **do not** commit that IP; set it in a local `.env` only.
- Focused on working functionality and simple, readable code for learning.