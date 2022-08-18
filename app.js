/*
 * IMPORTING DEPENDENCIES 
 */
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection = require("./Server/db/connection");
const userRoutes = require("./Server/routes/user");
const authRoutes = require("./Server/routes/auth");
const reviewRoutes = require("./Server/routes/review");
const travelBlogRoutes = require("./Server/routes/travelBlog");
const adventureRoutes = require("./Server/routes/adventure");
const productsRoutes = require("./Server/routes/products");
const userExperienceRoutes = require("./Server/routes/userExperience");
const bookingsRoutes = require("./Server/routes/bookings");

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
app.use("/api/products", productsRoutes);
app.use("/api/userExperience", userExperienceRoutes);
app.use("/api/bookings", bookingsRoutes);
/*
 * STARTING APP
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});