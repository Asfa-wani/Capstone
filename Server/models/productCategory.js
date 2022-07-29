const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, );

const ProductCategory = mongoose.model("productCategory", productCategorySchema);
module.exports = { ProductCategory };