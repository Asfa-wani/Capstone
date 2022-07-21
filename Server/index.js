/*
 * IMPORTING DEPENDENCIES 
 */
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection = require("./db/connection");
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

/*
 * STARTING APP
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});