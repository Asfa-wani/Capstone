/*
 * CRUD OPERATIONS FOR USER TRAVEL BLOGS
 */

const { TravelBlog } = require("../models/travelBlog");
const joi = require("joi");
// IMPORT


//FUNCTION TO CREATE A REVIEW
const createTravelBlog = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, blog, image } = req.body;
        //VALIDATE DATA
        const { error } = validateBlog({ title, blog, image });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER
        const travelBlog = await TravelBlog.findOne({ title: title, user: req.profile._id });
        if (travelBlog)
            return res.status(409).send({ message: "Blog with this title by the user already exists" });

        //IF NOT EXISTING THEN POST THE REVIEW
        await new TravelBlog({ user: req.profile, title: title, blog: blog, image: image }).save();
        res.status(200).send({ message: "Blog posted successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO UPDATE A REVIEW
const updateTravelBlog = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, blog, image } = req.body;
        //VALIDATE DATA
        const { error } = validateBlog({ title, blog, image });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER
        await TravelBlog.findByIdAndUpdate({ _id: req.params.id }, { user: req.profile, title: title, blog: blog, image: image });
        res.status(200).send({ message: "Travel blogupdated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO DELETE REVIEW
const deleteTravelBlog = async(req, res) => {
    try {
        await TravelBlog.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}
module.exports = { createTravelBlog, updateTravelBlog, deleteTravelBlog };

// JOI VALIDATION FUNCTION
const validateBlog = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        blog: joi.string().required().label("Blog"),
        image: joi.string().required().label("Image"),
    });

    return schema.validate(data);
}