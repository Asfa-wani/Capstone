/* 
 *  CATEGORY CRUD OPERATIONS
 */
//IMPORTS
const { AdventureCategory } = require('../models/adventureCategory');
const { Adventure } = require('../models/adventure');

// FUNCTION TO FIND ADVENTURE CATEGORY BY ID
const adventCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, adventCategory) => {
        if (err || !adventCategory) {
            return res.status(400).json({
                error: ' Adventure Category does not exist'
            });
        }
        req.adventCategory = adventCategory;
        next();
    });
};

// FUNCTION TO READ ADVENTURE CATEGORY BY ID
const readAdventCategory = (req, res) => {
    return res.status(200).send(req.adventCategory);
};


//FUNCTION TO FIND ALL THE ADVENTURE CaTEGORIES

const readAllAdventCategories = async(req, res) => {
    try {
        const adventCategories = await AdventureCategory.find({});
        if (!adventCategories)
            return res.status(404).send({ message: "No adventure categories found" });
        res.status(200).send(adventCategories);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

//FUNCTION TO CREATE A ADVENTURE CATEGORY
const createAdventCategory = async(req, res) => {
    try {

        //CHECK IF THE ADVENTURE CATEGORY ALREADY EXISTS 
        const adventCategory = await AdventureCategory.findOne({ name: req.body.name });
        if (adventCategory)
            return res.status(409).send({ message: "Adventure category already exists" });

        //IF NOT EXISTING THEN POST THE ADVENTURE CATEGORY
        await new AdventureCategory(req.body).save();
        res.status(200).send({ message: "Adventure Categry added successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO UPDATE A ADVENTURE CATEGROY
const updateAdventCategory = async(req, res) => {
    try {

        //CHECK IF THE ADVENTURE ALREADY EXISTS BY THIS USER
        await AdventureCategory.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send({ message: "Adventure category updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO DELETE ADVENTURE
const deleteAdventCategory = async(req, res) => {
    try {
        const adventCategory = req.adventCategory;
        const adventure = Adventure.find({ adventCategory });
        if (adventure)
            return res.status(400).send({ message: `Sorry. You cant delete ${adventCategory.name}. It has ${adventure.length} associated products.` });

        await AdventureCategory.findByIdAndDelete({ _id: adventCategory._id });
        res.status(200).send({ message: "Product category deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

module.exports = { adventCategoryById, readAdventCategory, readAllAdventCategories, createAdventCategory, updateAdventCategory, deleteAdventCategory };