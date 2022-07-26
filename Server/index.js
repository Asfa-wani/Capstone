/*
 * IMPORTING DEPENDENCIES 
 */
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection = require("./db/connection");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const travelBlogRoutes = require("./routes/travelBlog");
const adventureRoutes = require("./routes/adventure");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;

/**
 * DB CONNECTION
 */
connection()

/*
 * INITIALIZING EXPRESS APP
 */
const app = express();

/**
 * MIDDLEWARE
 */
app.use(express.json());
app.use(cors());
app.use(cookieParser());

/**
 * CREATING APIS
 */
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/travelBlog", travelBlogRoutes);
app.use("/api/adventure", adventureRoutes);

/*
 * STARTING APP
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});