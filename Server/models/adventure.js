//IMPORT STATEMENTS
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//CREATING ADVENTURE SCHEMA
const adventureSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: ObjectId, ref: "adventureCategory", required: true },
    image: { type: String, required: true }

});

//CREATING THE MODEL
const Adventure = mongoose.model("adventure", adventureSchema);
module.exports = { Adventure };