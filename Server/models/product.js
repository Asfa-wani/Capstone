//IMPORT
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//CREATE PRODUCT SCHEMA
const productSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, reuired: true },
    image: { type: String, required: true },
    prodCategory: { type: ObjectId, ref: "ProductCategory", required: true },
    adventCategory: { type: ObjectId, ref: "AdventureCategory", required: true },
    url: { type: String, required: true }
});

//CREATE AND EXPORT PRODUCT MODEL
const Product = mongoose.model("product", productSchema);
module.exports = { Product };