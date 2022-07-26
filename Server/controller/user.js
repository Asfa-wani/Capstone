/*
 * CRUD OPERATIONS FOR USER 
 */

//IMPORT STATEMENTS
const joi = require("joi");
const { User } = require("../models/user");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");


//FUNCTION TO FIND THE USER BY ID

const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

//FUNCTION TO UPDATE USER INFO
const updateUser = async(req, res) => {
    try {
        //EXTRACT DATA FROM REQUEST
        const { name, password, address, phone, age } = req.body;
        //VALIDATE DATA
        const { error } = validateUpdate({ name, password, address, phone, age });
        if (error)
            return res.status(401).send({ message: error.details[0].message });
        //ENCRYPT THE PASSWORD
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);

        //UPDATE  USER INFO
        await User.findByIdAndUpdate({ _id: req.profile.id }, {
            name: name,
            password: hashPassword,
            address: address,
            phone: phone,
            age: age
        }, { new: true });
        console.log("check")
            //console.log(updatedUser)

        res.status(200).send({ message: "user updated successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

//FUNCTION TO DELETE USER
const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.profile.id });
        res.status(200).send({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "internal server error" })
    }
}

module.exports = { updateUser, deleteUser, userById };
//VALIDATE INFO FROM USER USING JOI VALIDATION
const validateUpdate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        address: joi.object().required().label("Address"),
        phone: joi.string().required().label("Phone"),
        age: joi.number().required().label("Age"),
    });
    return schema.validate(data);
}