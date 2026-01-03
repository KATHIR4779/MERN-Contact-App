# MERN Contact API (server)

Instructions:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `PORT` as needed.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev` (requires `nodemon`) or `npm start`.

API Endpoints:
- GET /api/contacts
- POST /api/contacts
- DELETE /api/contacts/:id

This server uses Express, Mongoose and simple validation via `express-validator`.