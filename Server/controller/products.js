/*
 * CRUD OPERATIONS FOR PRODUCTS (ADMIN ONLY)
 */
// IMPORT

const { Product } = require("../models/product");
const joi = require("joi");
const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable");

//FUNCTION TO FIND THE PRODUCT BY ID

const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: 'Product not found'
            });
        }
        req.product = product;
        next();
    });
};

//FUNCTION TO FIND THE PRODUCT

const readProduct = async(req, res) => {
    product = req.product;
    res.status(200).send(product);
}

//FUNCTION TO FIND ALL THE PRODUCTS

const readAllProdocts = async(req, res) => {
    try {
        const products = await Product.find({});
        if (!products)
            return res.status(404).send({ message: "No products found" });
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

//FUNCTION TO READ PRODUCTS BY PARTICULAR DESTINATION
const readDestProducts = async(req, res) => {
    try {
        const destination = req.adventure;
        category = destination.category[0];
        const destProducts = await Product.find({ category: category });
        if (!destProducts[0])
            return res.status(404).send({ message: "No products for this destination found" });
        res.status(200).send(destProducts);

    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}

//FUNCTION TO READ PRODUCTS BY PARTICULAR CATEGORY
const readProductsCategory = async(req, res) => {
    try {
        const destination = req.adventure;
        category = destination.category[1];
        const destProducts = await Product.find({ category: category });
        if (!destProducts[1])
            return res.status(404).send({ message: "No products for this destination found" });
        res.status(200).send(destProducts);

    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}


//FUNCTION TO CREATE A PRODUCT
/* const createProduct = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, description, image, category, url } = req.body;
        //VALIDATE DATA
        const { error } = validateProduct({ title, description, image, category, url });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE PRODUCT ALREADY EXISTS BY THIS USER
        const adventure = await Product.findOne({ title: title });
        if (adventure)
            return res.status(409).send({ message: "Product already exists" });

        //IF NOT EXISTING THEN POST THE PRODUCT
        await new Product({ title: title, description: description, image: image, category: category, url: url }).save();
        res.status(200).send({ message: "Product added successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
}; */
//FUNCTION TO CREATE A TRAVEL BLOG
const createProduct = (req, res) => {
    try {
        //USING FORMIDABLE FORM TO EXTRACT INCOMING DATA
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async(err, fields, files) => {
            if (err)
                return res.status(400).send({ error: "Image could not be uploaded", });

            const { title, description, category, url } = fields;
            if (!title || !description || !category || !url)
                return res.status(400).json({ error: "All fields are required", });

            // CHECK IF THE BLOG ALREADY EXISTS
            const existingProduct = await Product.findOne({ title: title, category: category });
            if (existingProduct)
                return res.status(409).send({ message: "Product  with this title  already exists" });

            //CREATING TRAVEL BLOG WITHOUT IMAGE
            let product = new Product({ title: title, description: description, category: category, url: url });
            // 1kb = 1000
            // 1mb = 1000000
            if (files.photo) {
                if (files.photo.size > 1000000)
                    return res.status(400).json({ error: "Image should be less than 1mb in size", });
                product.photo.data = fs.readFileSync(files.photo.filepath);
                product.photo.contentType = files.photo.type;
            };
            //SAVE THE TRAVELBLOG WITH IMAGE IN DB
            const result = await product.save();
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(500).send({ message: "server error" })
    }
};

//FUNCTION TO UPDATE THE TRAVEL BLOG
const updateProduct = (req, res) => {
    try {
        //USING FORMIDABLE FORM TO EXTRACT INCOMING DATA
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async(err, fields, files) => {
            if (err)
                return res.status(400).send({ error: "Image could not be uploaded", });


            // CHECK IF THE BLOG ALREADY EXISTS
            const existingProduct = await TravelBlog.findOne({ title: fields.title });
            if (existingProduct)
                return res.status(409).send({ message: "Blog with this title by the user already exists" });

            //RETRIEVE TRAVELBLOG BY ID
            let product = req.product;
            //PUT NEW FORM FIELDS IN THE TRAVEL BLOG THAT IS TO BE UPDATED
            product = _.extend(product, fields);

            // 1kb = 1000
            // 1mb = 1000000
            //PUT THE IMAGE IN PHOTO FIELD OF TRAVEL BLOG
            if (files.photo) {
                if (files.photo.size > 1000000)
                    return res.status(400).json({ error: "Image should be less than 1mb in size", });

                product.photo.data = fs.readFileSync(files.photo.filepath);
                product.photo.contentType = files.photo.type;
            };
            //SEND THE UPDATED TRAVEL BLOG AS RESPONSE
            const result = await product.save();
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};


//FUNCTION TO UPDATE A PRODUCT
/* const updateProduct = async(req, res) => {
    try {

        //EXTRACT DATA FROM REQUEST
        const { title, description, image, category, url } = req.body;
        //VALIDATE DATA
        const { error } = validateProduct({ title, description, image, category, url });
        if (error)
            return res.status(409).send({ message: error.details[0].message });

        //CHECK IF THE PRODUCT ALREADY EXISTS BY THIS USER
        await Product.findByIdAndUpdate({ _id: req.params.id }, { title: title, description: description, image: image, category: category, url: url });
        res.status(200).send({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};
 */
//FUNCTION TO DELETE PRODUCT
const deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
}
module.exports = { createProduct, updateProduct, deleteProduct, productById, readProduct, readAllProdocts, readDestProducts, readProductsCategory };

// JOI VALIDATION FUNCTION
const validateProduct = (data) => {
    const schema = joi.object({
        title: joi.string().required().label("Title"),
        description: joi.string().required().label("Blog"),
        category: joi.array().required().label("Category"),
        image: joi.string().required().label("Image"),
        url: joi.string().required().label("URL")
    });

    return schema.validate(data);
}