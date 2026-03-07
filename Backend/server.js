const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB, getDB } = require('./db');
const PORT = process.env.PORT || 5000;
const productsRoutes = require('./routes/products_routes')
const categoriesRoutes = require('./routes/categories_routes')
dotenv.config();
// Initialize Express app
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("Menu API is running...");
});
app.use('/v1/api/products', productsRoutes)
app.use('/v1/api/categories', categoriesRoutes)
// Connect to MongoDB
let db;
connectDB((error) => {
    if (!error) {
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        db = getDB();
    }
    console.log("Database connected successfully");
})
