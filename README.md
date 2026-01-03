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

Deploying to Vercel (serverless API)
- The client can be deployed to Vercel and includes serverless API endpoints under `/api` that use the same MongoDB database.
- Steps:
  1. In the Vercel dashboard, import this repository and choose the `client` folder as the project root (or deploy the monorepo and set root to `client`).
  2. In Settings → Environment Variables, add `MONGO_URI` pointing to your MongoDB (Atlas recommended).
  3. Vercel will run `npm run build` (Vite) and serve static assets from `dist`. The `/api` folder contains serverless functions for contacts.
  4. No separate server deployment is necessary when using these serverless functions.

Notes
- API base is `http://localhost:5000` by default for local dev; change via `client/.env` VITE_API_URL if needed. If `localhost:5000` is already bound by another service on Windows, use your machine IP (for example `http://10.153.238.82:5000`).
- Focused on working functionality and simple, readable code for learning.