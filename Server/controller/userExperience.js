/*
 * CRUD OPERATIONS FOR USER EXPERIENCES WITH DREAM TRAVELS
 */

// IMPORT
const { UserExperience } = require("../models/userExperience");
const joi = require("joi");

//FUNCTION TO FIND THE USER EXPERIENCE BY ID
const userExperienceById = (req, res, next, id) => {
    UserExperience.findById(id).exec((err, userExperience) => {
        if (err || !userExperience) {
            return res.status(404).json({
                error: 'User experience  not found!'
            });
        }
        req.userExperience = userExperience;
        next();
    });
};

//FUNCTION TO RETRIEVE THE EXPERIENCE
const readUserExperience = async(req, res) => {
    const id = req.profile._id;
    const userExperience = await UserExperience.find({ user: id });
    if (!userExperience)
        return res.status(404).send({ message: "No experiences available" });

    res.status(200).send(userExperience);
}

//FUNCTION TO FIND ALL USER EXPERIENCES 
const readAllUsersExperiences = async(req, res) => {
    try {
        const experienceByUsers = await UserExperience.find({});
        if (!experienceByUsers[0])
            return res.status(404).send({ message: "No user experiences available" });

        res.status(200).send(experienceByUsers);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}


//FUNCTION TO CREATE A USER EXPERIENCE
const createUserExperience = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { experience, rating } = req.body;
        //VALIDATE DATA
        const { error } = validateExperience({ experience, rating });
        if (error)
            return res.status(400).send({ message: error.details[0].message });


        //ALLOWING MULTIPLE USER EXPERIENCES 
        /*//CHECK IF THE EXPERIENCE ALREADY EXISTS BY THIS USER
         const userExperience = await UserExperience.findOne({ user: req.profile._id });
         if (userExperience)
             return res.status(409).send({ message: "User experience already exists" }); */

        //IF NOT EXISTING THEN POST THE EXPERIENCE
        await new UserExperience({ user: req.profile._id, experience, rating }).save();
        res.status(200).send({ message: "Experience  posted successfully" });

    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

//FUNCTION TO UPDATE A EXPERIENCE
const updateUserExperience = async(req, res) => {
    try {
        const id = req.userExperience._id

        //EXTRACT DATA FROM REQUEST
        const { experience, rating } = req.body;
        //VALIDATE DATA
        const { error } = validateExperience({ experience, rating });
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER
        await UserExperience.findByIdAndUpdate({ _id: id }, { user: req.profile, experience, rating });
        res.status(200).send({ message: "Experience  updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

//FUNCTION TO DELETE REVIEW
const deleteUserExperience = async(req, res) => {
    try {
        await UserExperience.findByIdAndDelete({ _id: req.userExperience._id });
        res.status(200).send({ message: "Experience deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}
module.exports = {
    createUserExperience,
    updateUserExperience,
    deleteUserExperience,
    userExperienceById,
    readUserExperience,
    readAllUsersExperiences
};

// JOI VALIDATION FUNCTION
const validateExperience = (data) => {
    const schema = joi.object({
        experience: joi.string().required().label("Experience"),
        rating: joi.number().required().label("Rating"),
    });

    return schema.validate(data);
}