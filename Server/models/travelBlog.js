/* 
 * IMPORTS
 */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//CREATE TRAVEL BLOG SCHEMA
const travelBlogSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: 'User' },
    title: { type: String, required: true, unique: true },
    blog: { type: String, required: true },
    photo: {
        data: Buffer,
        contentType: String
    },
}, { timestamps: true });

//EXPORTING AND CREATING TRAVEL BLOG MODEL 
const TravelBlog = mongoose.model("TravelBlog", travelBlogSchema);
module.exports = { TravelBlog };