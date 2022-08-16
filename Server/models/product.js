//IMPORT
const mongoose = require("mongoose");

//CREATE PRODUCT SCHEMA
const productSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, reuired: true },
    image: { type: String, required: true },
    category: { type: Array },
    url: { type: String, required: true }
});

//CREATE AND EXPORT PRODUCT MODEL
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };