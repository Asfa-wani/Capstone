/* 
 * IMPORTS
 */

const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

//CREATE REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "User" },
    adventure: { type: ObjectId, ref: 'Adventure' },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true }
}, { timestamps: true });

//REVIEW MODEL
const Review = mongoose.model("Review", reviewSchema);
module.exports = { Review };