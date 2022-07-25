//IMPORT
const mongoose = require("mongoose");
const joi = require("joi");

//CREATE REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    adventure: { type: mongoose.Schema.Types.ObjectId, ref: 'Adventure' },
    title: { type: String, maxlength: 100, required: true },
    content: { type: String, maxlength: 200, required: true },
    rating: { type: Number, required: true }
});

//REVIEW MODEL
const Review = mongoose.model("review", reviewSchema);

module.exports = { Review, validateReview };

const validateReview = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        content: joi.string().required().label("Content"),
        rating: joi.number().required().label("Rating"),
    });
    return schema.validate(data);
}