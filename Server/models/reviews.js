//IMPORT
const mongoose = require("mongoose");

//CREATE REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    adventure: { type: mongoose.Schema.Types.ObjectId, ref: 'Adventure' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true }
});

//REVIEW MODEL
const Review = mongoose.model("review", reviewSchema);

module.exports = { Review };