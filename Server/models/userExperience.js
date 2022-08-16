/* 
 * IMPORTS
 */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//CREATE USER EXPERIENCE  SCHEMA
const userExperienceSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "User" },
    experience: { type: String, required: true },
    rating: { type: Number, required: true }
}, { timestamps: true });

//USER EXPERIENCE MODEL
const UserExperience = mongoose.model("UserExperience", userExperienceSchema);
module.exports = { UserExperience };