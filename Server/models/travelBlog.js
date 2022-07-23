//IMPORT
const mongoose = require("mongoose");

//CREATE TRAVEL BLOG SCHEMA
const travelBlogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blog: { type: String, required: true },
    image: { type: String },
});

//EXPORTING AND CREATING TRAVEL BLOG MODEL 
const TravelBlog = mongoose.model("travelBlog", travelBlogSchema);
module.exports = { TravelBlog };