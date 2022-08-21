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
    const adventure = req.adventure;
    res.status(200).send(adventure);
};

//FUNCTION TO FIND ALL THE ADVENTURES
const readAllAdventures = async(req, res) => {
    try {
        const adventures = await Adventures.find({});
        if (!adventures)
            return res.status(404).send({ message: "No adventures found" });
        res.status(200).send(adventures);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

//FUNCTION TO READ ADVENTURES BY PARTICULAR CATEGORY
const readAdventuresByCategory = async(req, res) => {
    try {
        console.log("hello")
        const destination = req.adventure;
        Category = destination.category[0];
        console.log("hello")
        const adventuresByCategory = await Adventure.find({ category: category });
        console.log("hello")
        if (!adventuresByCategory[0])
            return res.status(404).send({ message: "No products for this destination found" });
        res.status(200).send(adventuresByCategory);

    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

//FUNCTION TO ADD ADVENTURE BOOKING TO USER'S HISTORY 
const addReviewToAdventure = async(req, res, next) => {
    try {
        let reviews = [];
        reviews.push(req.body);

        await Adventure.findOneAndUpdate({ _id: req.adventure._id }, { $push: { reviews: reviews } }, { new: true });
        next();

    } catch (error) {
        res.status(500).send({ message: "Server error, could not update history!" });
    }

};

//FUNCTION TO READ POPULAR ADVENTURE
/* const readPopularAdventure = async(req, res) => {
    try {
        const sort = { reviews: { rating: -1 } };
        console.log("hello")
        const adventureReviews = await Adventure.find({}).sort("-rating");
        console.log("hello")
        console.log(adventureReviews)
        if (!bookings)
            return res.status(404).send({ message: "No booking history" });
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};
 */
//FUNCTION TO CREATE AN ADVENTURE
const createAdventure = (req, res) => {
    try {
        //USING FORMIDABLE FORM TO GET USER DATA
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
module.exports = {
    createAdventure,
    updateAdventure,
    deleteAdventure,
    readAdventure,
    adventureById,
    readAdventuresByCategory,
    readAllAdventures,
    addReviewToAdventure,
    // readPopularAdventure
};