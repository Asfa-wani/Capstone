//IMPORT
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//CREATE TRAVEL BLOG SCHEMA
const travelBlogSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: 'User' },
    title: { type: String, required: true, unique: true },
    blog: { type: String, required: true },
    image: { type: String },
});

//EXPORTING AND CREATING TRAVEL BLOG MODEL 
const TravelBlog = mongoose.model("travelBlog", travelBlogSchema);
module.exports = { TravelBlog };