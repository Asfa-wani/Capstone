//IMPORT STATEMENTS
const mongoose = require("mongoose");

//CREATING ADVENTURE SCHEMA
const adventureSchema = new mongoose.Schema({

    title: { type: String, required: true, unique },
    description: { type: String, required: true },
    category: { type: Array },
    image: { type: String, required: true }

});

//CREATING THE MODEL
const Adventure = mongoose.model("adventure", adventureSchema);
module.exports = { Adventure };