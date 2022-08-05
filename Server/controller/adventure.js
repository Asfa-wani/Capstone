/*
 * CRUD OPERATIONS FOR ADVENTURES (ADMIN ONLY)
 */
// IMPORT
const { Adventure } = require("../models/adventure");
//const joi = require("joi");
const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable")

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
const createAdventure = (req, res) => {
    try {
        //USING FORMIDABLE FORM TO EXTRACT INCOMING DATA
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async(err, fields, files) => {
            if (err)
                return res.status(400).send({ error: "Image could not be uploaded", });

            const { title, description, category, price } = fields;
            if (!title || !description || !category || !price)
                return res.status(400).json({ error: "All fields are required", });

            // CHECK IF THE ADVENTURE ALREADY EXISTS
            const existingAdventure = await Adventure.findOne({ title: title });
            if (existingAdventure)
                return res.status(409).send({ message: "Adventure with this title  already exists" });

            //CREATING TRAVEL ADVENTURE WITHOUT IMAGE
            let adventure = new Adventure({ title: title, description: description, category: category, price: price });
            // 1kb = 1000
            // 1mb = 1000000
            if (files.photo) {
                if (files.photo.size > 1000000)
                    return res.status(400).json({ error: "Image should be less than 1mb in size", });
                adventure.photo.data = fs.readFileSync(files.photo.filepath);
                adventure.photo.contentType = files.photo.type;
            };
            //SAVE THE ADVENTURE WITH IMAGE IN DB
            const result = await adventure.save()
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(500).send({ message: "server error" })
    }
};

//FUNCTION TO UPDATE A ADVENTURE
const updateAdventure = (req, res) => {
    try {
        //USING FORMIDABLE FORM TO EXTRACT INCOMING DATA
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async(err, fields, files) => {
            if (err)
                return res.status(400).send({ error: "Image could not be uploaded", });

            // CHECK IF THE ADVENTURE ALREADY EXISTS
            const existingAdventure = await Adventure.findOne({ title: fields.title });
            if (existingAdventure)
                return res.status(409).send({ message: "Adventure with this title  already exists" });
            //RETRIEVE ADVENTURE BY ID
            let adventure = req.adventure;
            //PUT NEW FORM FIELDS IN THE ADVENTURE THAT IS TO BE UPDATED
            adventure = _.extend(adventure, fields);

            // 1kb = 1000
            // 1mb = 1000000
            //PUT THE IMAGE IN PHOTO FIELD OF ADVENTURE
            if (files.photo) {
                if (files.photo.size > 1000000)
                    return res.status(400).json({ error: "Image should be less than 1mb in size", });

                adventure.photo.data = fs.readFileSync(files.photo.filepath);
                adventure.photo.contentType = files.photo.type;
            };
            //SEND THE UPDATED ADVENTURE AS RESPONSE
            const result = await adventure.save();
            res.status(200).send(result);
        });
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

/* // JOI VALIDATION FUNCTION
const validateAdventure = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        description: joi.string().required().label("Blog"),
        category: joi.array().required().label("Category"),
        image: joi.string().required().label("Image"),
        price: joi.number().required().label("Price"),
    });

    return schema.validate(data);
} */