# MERN Contact API (server)

Instructions:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `PORT` as needed.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev` (requires `nodemon`) or `npm start`.

API Endpoints:
- GET /api/contacts
- POST /api/contacts
- DELETE /api/contacts/:id

Note: This server is useful for local development. For deploying the whole project to Vercel, the `client/api` folder contains serverless functions that implement the same endpoints using the MongoDB driver. When deploying to Vercel set the `MONGO_URI` in the Vercel project settings.

This server uses Express, Mongoose and simple validation via `express-validator`.