/*
 * CRUD OPERATIONS FOR USER REVIEW
 */
// IMPORT
const { Review } = require("../models/reviews");
const joi = require("joi");

//FUNCTION TO FIND THE REVIEW BY ID

const reviewById = (req, res, next, id) => {
    Review.findById(id).exec((err, review) => {
        if (err || !review) {
            return res.status(400).json({
                error: 'Review not found'
            });
        }
        req.review = review;
        next();
    });
};

//FUNCTION TO FIND THE REVIEW

const readReview = async(req, res) => {
    review = req.review;
    res.status(200).send(review);
}

//FUNCTION TO FIND ALL REVIEWS BY A PARTICULAR USER
const readUserReviews = async(req, res) => {
    try {
        const id = req.profile._id;
        const reviewsByUser = await Review.find({ user: id });
        if (!reviewsByUser[0])
            return res.status(404).send({ message: "No reviews by the user yet" });

        res.status(200).send(reviewsByUser);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

//FUNCTION TO FIND ALL REVIEWS TO A PARTICULAR DESTINATION BY THE USERS
const readDestinationReview = async(req, res) => {
    try {
        const id = req.adventure._id;
        const reviewsByUser = await Review.find({ adventure: id });
        if (!reviewsByUser[0])
            return res.status(404).send({ message: "No reviews by the user yet" });

        res.status(200).send(reviewsByUser);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

//FUNCTION TO FIND  REVIEW TO A PARTICULAR DESTINATION BY A PARTICULAR USER
const readDestReviewByUser = async(req, res) => {
    try {

        const reviewsByUser = await Review.find({ user: req.profile._id, adventure: req.adventure._id });
        if (!reviewsByUser[0])
            return res.status(404).send({ message: "No reviews by the user for this destination yet" });

        res.status(200).send(reviewsByUser);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

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
        const review = await Review.findOne({ user: req.profile._id, adventure: req.adventure._id });
        if (review)
            return res.status(409).send({ message: "Review for the destination by the user already exists" });

        //IF NOT EXISTING THEN POST THE REVIEW
        await new Review({ user: req.profile._id, adventure: req.adventure._id, title: title, content: content, rating: rating }).save();

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
module.exports = {
    createReview,
    updateReview,
    deleteReview,
    readUserReviews,
    readDestinationReview,
    reviewById,
    readReview,
    readDestReviewByUser
};

// JOI VALIDATION FUNCTION
const validateReview = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        content: joi.string().required().label("Content"),
        rating: joi.number().required().label("Rating"),
    });

    return schema.validate(data);
}