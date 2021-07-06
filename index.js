const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const flashcards = require('./routes/flashcards');
const collections = require('./routes/collections');
const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/flashcards', flashcards);
app.use('/api/collections', collections);
const port = process.env.Port || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});