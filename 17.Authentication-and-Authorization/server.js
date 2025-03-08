require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)

// Database connection
connectToDB(); 

app.listen(PORT, () => {
  console.log(`Server is now listening to Port: ${PORT}`);
});