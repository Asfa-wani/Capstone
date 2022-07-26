//IMPORT
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//CREATE REVIEW SCHEMA

const reviewSchema = new mongoose.Schema({
    user: { type: ObjectId, re: "User" },
    adventure: { type: ObjectId, ref: 'Adventure' },
    title: { type: String, minlength: 10, maxlength: 100, required: true, unique: true },
    content: { type: String, maxlength: 200, required: true },
    rating: { type: Number, required: true }
});

//REVIEW MODEL
const Review = mongoose.model("review", reviewSchema);
module.exports = { Review };