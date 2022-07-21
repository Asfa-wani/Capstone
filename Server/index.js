/*
 * IMPORTING DEPENDENCIES 
 */
const express = require("express");
require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 3000;


/*
 * INITIALIZING EXPRESS APP
 */
const app = express();


/*
 * STARTING APP
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});