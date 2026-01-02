require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config_db');
const contactsRouter = require('./routes/contacts');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/contacts', contactsRouter);

// health
app.get('/', (req, res) => res.send('MERN Contact API running'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/contacts_db';

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
