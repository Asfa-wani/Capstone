/* 
 * IMPORTS
 */
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


/* 
 * USER SCHEMA
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    address: { type: Object, required: true, },
    phone: { type: String, maxlength: 10, required: true, },
    age: { type: Number, required: true, },
    role: { type: Number, default: 0 },
    history: {
        type: Array,
        default: []
    },
    feedback: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
});

/* 
 * SCHEMA METHOD TO GENERATE JWT TOKEN FOR AUTHORIZATION 
 */
userSchema.methods.genAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SEC, { expiresIn: "7days" });
    return token;
};

/* 
 * CREATING THE USER MODEL 
 */
const User = mongoose.model("User", userSchema);

/* 
 * VALIDATING USER INFO WITH JOI VALIDATION 
 */
const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"), //USING JOI PASSWORD COMPLEXITY
        address: joi.object().required().label("Address"),
        phone: joi.string().length(10).required().label("Phone"),
        age: joi.number().required().label("Age"),


    });
    return schema.validate(data);
}

/* 
 * EXPORTING MODEL 
 */
module.exports = { User, validate }