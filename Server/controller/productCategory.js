/* 
 *  CATEGORY CRUD OPERATIONS
 */
//IMPORTS
const { ProductCategory } = require('../models/productCategory');
const { Product } = require('../models/product');

// FUNCTION TO FIND PRODUCT CATEGORY BY ID
const prodCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, prodCategory) => {
        if (err || !prodCategory) {
            return res.status(400).json({
                error: ' product Category does not exist'
            });
        }
        req.prodCategory = prodCategory;
        next();
    });
};

// FUNCTION TO READ PRODUCT CATEGORY BY ID
const readProdCategory = (req, res) => {
    return res.status(200).send(req.prodCategory);
};


//FUNCTION TO FIND ALL THE PRODUCT CaTEGORIES

const readAllProdCategories = async(req, res) => {
    try {
        const prodCategories = await ProductCategory.find({});
        if (!prodCategories)
            return res.status(404).send({ message: "No product categories found" });
        res.status(200).send(prodCategories);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

//FUNCTION TO CREATE A PRODUCT CATEGORY
const createProdCategory = async(req, res) => {
    try {

        //CHECK IF THE PRODUCT CATEGORY ALREADY EXISTS 
        const prodCategory = await ProductCategory.findOne({ name: req.body.name });
        if (prodCategory)
            return res.status(409).send({ message: "Product category already exists" });

        //IF NOT EXISTING THEN POST THE PRODUCT CATEGORY
        await new ProductCategory(req.body).save();
        res.status(200).send({ message: "Product Categry added successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO UPDATE A PRODUCT CATEGROY
const updateProdCategory = async(req, res) => {
    try {

        //CHECK IF THE PRODUCT ALREADY EXISTS BY THIS USER
        await ProductCategory.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send({ message: "Product category updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

//FUNCTION TO DELETE PRODUCT
const deleteProdCategory = async(req, res) => {
    try {
        const prodCategory = req.prodCategory;
        const products = Product.find({ prodCategory });
        if (products)
            return res.status(400).send({ message: `Sorry. You cant delete ${prodCategory.name}. It has ${products.length} associated products.` });

        await ProductCategory.findByIdAndDelete({ _id: prodCategory._id });
        res.status(200).send({ message: "Product category deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

module.exports = { prodCategoryById, readProdCategory, readAllProdCategories, createProdCategory, updateProdCategory, deleteProdCategory };