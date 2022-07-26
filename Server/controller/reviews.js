/*
 * CRUD OPERATIONS FOR USER REVIEW
 */

const { Review } = require("../models/reviews");
const joi = require("joi");
// IMPORT


//FUNCTION TO CREATE A REVIEW
const createReview = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, content, rating } = req.body;
        //VALIDATE DATA
        const { error } = validateReview({ title, content, rating });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER
        const review = await Review.findOne({ title: title, user: req.profile._id });
        if (review)
            return res.status(409).send({ message: "Review for the destination by the user already exists" });

        //IF NOT EXISTING THEN POST THE REVIEW
        await new Review({ user: req.profile, title: title, content: content, rating: rating }).save();
        res.status(200).send({ message: "Review posted successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO UPDATE A REVIEW
const updateReview = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, content, rating } = req.body;
        //VALIDATE DATA
        const { error } = validateReview({ title, content, rating });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER
        await Review.findByIdAndUpdate({ _id: req.params.id }, { user: req.profile, title: title, content: content, rating: rating });
        res.status(200).send({ message: "Review updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO DELETE REVIEW
const deleteReview = async(req, res) => {
    try {
        await Review.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}
module.exports = { createReview, updateReview, deleteReview };

// JOI VALIDATION FUNCTION
const validateReview = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        content: joi.string().required().label("Content"),
        rating: joi.number().required().label("Rating"),
    });

    return schema.validate(data);
}