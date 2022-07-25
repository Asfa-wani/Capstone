/*
 * CRUD OPERATIONS FOR USER REVIEW
 */

const { validateReview, Review } = require("../models/reviews");

// IMPORT


//FUNCTION TO CREATE A REVIEW
const createReview = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, content, rating, adventure_id } = req.body;
        //VALIDATE DATA
        const { error } = validateReview(data);

        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER



    } catch (error) {

    }
}