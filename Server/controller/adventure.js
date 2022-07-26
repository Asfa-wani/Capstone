/*
 * CRUD OPERATIONS FOR ADVENTURES (ADMIN ONLY)
 */

const { Adventure } = require("../models/Adventure");
const joi = require("joi");
// IMPORT


//FUNCTION TO CREATE A REVIEW
const createAdventure = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, description, category, image } = req.body;
        //VALIDATE DATA
        const { error } = validateAdventure({ title, description, category, image });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER
        const adventure = await Adventure.findOne({ title: title });
        if (adventure)
            return res.status(409).send({ message: "Adventure already exists" });

        //IF NOT EXISTING THEN POST THE REVIEW
        await new Adventure({ title: title, description: description, category: category, image: image }).save();
        res.status(200).send({ message: "Adventure added successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO UPDATE A REVIEW
const updateAdventure = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, description, category, image } = req.body;
        //VALIDATE DATA
        const { error } = validateAdventure({ title, description, category, image });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE REVIEW ALREADY EXISTS BY THIS USER
        await Adventure.findByIdAndUpdate({ _id: req.params.id }, { title: title, description: description, category: category, image: image });
        res.status(200).send({ message: "Adventure updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO DELETE REVIEW
const deleteAdventure = async(req, res) => {
    try {
        await Adventure.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}
module.exports = { createAdventure, updateAdventure, deleteAdventure };

// JOI VALIDATION FUNCTION
const validateAdventure = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        description: joi.string().required().label("Blog"),
        category: joi.array().required().label("Category"),
        image: joi.string().required().label("Image"),
    });

    return schema.validate(data);
}