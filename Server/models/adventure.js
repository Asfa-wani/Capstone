//IMPORT STATEMENTS
const mongoose = require("mongoose");

//CREATING ADVENTURE SCHEMA
const adventureSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: Array, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }

});

//CREATING THE MODEL
const Adventure = mongoose.model("adventure", adventureSchema);
module.exports = { Adventure };