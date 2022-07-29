const mongoose = require("mongoose");

const adventureCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, );

const AdventureCategory = mongoose.model("adventureCategory", adventureCategorySchema);
module.exports = { AdventureCategory };