/*
 * CRUD OPERATIONS FOR USER TRAVEL BLOGS
 */
// IMPORT
const { TravelBlog } = require("../models/travelBlog");
const joi = require("joi");


//FUNCTION TO FIND THE ADVENTURE BY ID

const travelBlogById = (req, res, next, id) => {
    TravelBlog.findById(id).exec((err, travelBlog) => {
        if (err || !travelBlog) {
            return res.status(400).json({
                error: 'Travel Blog not found'
            });
        }
        req.travelBlog = travelBlog;
        next();
    });
};

//FUNCTION TO FIND ONE TRAVEL BLOG 

const readTravelBlog = async(req, res) => {
    travelBlog = req.travelBlog;
    res.status(200).send(travelBlog);
}

//FUNCTION TO FIND THE ALL TRAVEL BLOGS
const readAllTravelBlogs = async(req, res) => {
    try {
        const travelBlogs = await TravelBlog.find({});
        if (!travelBlogs)
            return res.status(404).send({ message: "NO travel Blogs exist!" });
        res.status(200).send(travelBlogs);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

//FUNCTION TO FIND THE ALL TRAVEL BLOGS BY A USER
const readUserTravelBlog = async(req, res) => {
    try {
        const travelBlogs = await TravelBlog.find({ user: req.profile._id });
        if (!travelBlogs)
            return res.status(404).send({ message: "NO travel Blogs By the user exist!" });
        res.status(200).send(travelBlogs);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

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
module.exports = {
    createTravelBlog,
    updateTravelBlog,
    deleteTravelBlog,
    travelBlogById,
    readTravelBlog,
    readAllTravelBlogs,
    readUserTravelBlog
};

// JOI VALIDATION FUNCTION
const validateBlog = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        blog: joi.string().required().label("Blog"),
        image: joi.string().required().label("Image"),
    });

    return schema.validate(data);
}