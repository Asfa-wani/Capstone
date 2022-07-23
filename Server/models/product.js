const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, reuired: true },
    image: { type: String, required: true },
    category: { type: Array },
    url: { type: String, required: true }
});

const Product = mongoose.model("product", productSchema);
module.exports = { Product };