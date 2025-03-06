import express from 'express';
import dotenv from 'dotenv';

import connectDB from './database/db.js';
import bookRoutes from './routes/book.route.js'

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// middleware -> express.json() to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);


// Connect to Database
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on Port: ${PORT}`);
});
