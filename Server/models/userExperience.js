const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//CREATE REVIEW SCHEMA

const userExperienceSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "User" },
    experience: { type: String, required: true },
    rating: { type: Number, required: true }
});

//REVIEW MODEL
const UserExperience = mongoose.model("userExperience", userExperienceSchema);
module.exports = { UserExperience };