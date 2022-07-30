/*
 * CRUD OPERATIONS FOR ADVENTURES (ADMIN ONLY)
 */
// IMPORT
const { Adventure } = require("../models/adventure");
const joi = require("joi");

//FUNCTION TO FIND THE ADVENTURE BY ID

const adventureById = (req, res, next, id) => {
    Adventure.findById(id).exec((err, adventure) => {
        if (err || !adventure) {
            return res.status(400).json({
                error: 'Destination not found'
            });
        }
        req.adventure = adventure;
        next();
    });
};

//FUNCTION TO FIND THE ADVENTURE

const readAdventure = async(req, res) => {
    adventure = req.adventure;
    res.status(200).send(adventure);
}

//FUNCTION TO CREATE A ADVENTURE
const createAdventure = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, description, category, image, price } = req.body;
        //VALIDATE DATA
        const { error } = validateAdventure({ title, description, category, image, price });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE ADVENTURE ALREADY EXISTS BY THIS USER
        const adventure = await Adventure.findOne({ title: title });
        if (adventure)
            return res.status(409).send({ message: "Adventure already exists" });

        //IF NOT EXISTING THEN POST THE ADVENTURE
        await new Adventure({ title: title, description: description, category: category, image: image, price: price }).save();
        res.status(200).send({ message: "Adventure added successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO UPDATE A ADVENTURE
const updateAdventure = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, description, category, image, price } = req.body;
        //VALIDATE DATA
        const { error } = validateAdventure({ title, description, category, image, price });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE ADVENTURE ALREADY EXISTS BY THIS USER
        await Adventure.findByIdAndUpdate({ _id: req.params.id }, { title: title, description: description, category: category, image: image, price: price });
        res.status(200).send({ message: "Adventure updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO DELETE ADVENTURE
const deleteAdventure = async(req, res) => {
    try {
        await Adventure.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ message: "Adventure deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}
module.exports = { createAdventure, updateAdventure, deleteAdventure, readAdventure, adventureById };

// JOI VALIDATION FUNCTION
const validateAdventure = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        description: joi.string().required().label("Blog"),
        category: joi.array().required().label("Category"),
        image: joi.string().required().label("Image"),
        price: joi.number().required().label("Price"),
    });

    return schema.validate(data);
}