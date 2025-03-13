import dotenv from "dotenv";
import express from "express";
import { connectToDB } from "./database/db.config.js";
import productRoutes from "./routes/product.route.js";
import bookRoutes from "./routes/book.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
connectToDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/product', productRoutes);
app.use('/api/book', bookRoutes);


app.listen(PORT, () => {
  console.log(`Server listening to Port: ${PORT}`)
});


