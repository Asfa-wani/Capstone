const mongoose = require("mongoose");

const travelBlogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blog: { type: String, required: true },
    image: { type: String },
});

const TravelBlog = mongoose.model("travelBlog", travelBlogSchema);
module.exports = { TravelBlog };