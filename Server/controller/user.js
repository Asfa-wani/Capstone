/*
 * CRUD OPERATIONS FOR USER 
 */

//IMPORT STATEMENTS
const joi = require("joi");
const { User } = require("../models/user");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const { Bookings } = require("../models/bookings");


//FUNCTION TO FIND THE USER BY ID

const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

//FUNCTION TO FIND ONE USER

const readUser = (req, res) => {
    const user = req.profile;
    res.status(200).send(user);
}

//FUNCTION TO FIND ONE USER
const readAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        if (!users)
            return res.status(404).send({ message: "No users found" });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }

};


//FUNCTION TO UPDATE USER INFO
const updateUser = async(req, res) => {
    try {
        //EXTRACT DATA FROM REQUEST
        const { name, password, address, phone, age } = req.body;
        //VALIDATE DATA
        const { error } = validateUpdate({ name, password, address, phone, age });
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        //ENCRYPT THE PASSWORD USING BCRYPT
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

        res.status(200).send({ message: "User updated successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

//FUNCTION TO DELETE USER
const deleteUser = async(req, res) => {
    try {
        //SEARCH FOR THE USER IN DB AND DELETE
        await User.findByIdAndDelete({ _id: req.profile.id });
        res.status(200).send({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

//FUNCTION TO ADD ADVENTURE BOOKING TO USER'S HISTORY 
const addBookingToUserHistory = async(req, res, next) => {
    try {
        let history = [];
        history.push(req.adventure);
        //console.log("history", history)
        await User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true });
        next();

    } catch (error) {
        res.status(500).send({ message: "Server error, could not update history!" });
    }

};

//FUNCTION TO ADD ADVENTURE BOOKING TO USER'S HISTORY 
const addExperienceToUserFeedback = async(req, res, next) => {
    try {
        let feedback = [];
        feedback.push(req.userExperience);

        console.log("feedback", feedback)
        await User.findOneAndUpdate({ _id: req.profile._id }, { $push: { feedback: feedback } }, { new: true });
        next();

    } catch (error) {
        res.status(500).send({ message: "Server error, could not update history!" });
    }

};


//FUNCTION TO RETRIEVE BOOKINGS BY THE USER
const readBookingHistory = async(req, res) => {
    try {
        const bookings = await Bookings.find({ user: req.profile._id });
        if (!bookings)
            return res.status(404).send({ message: "No booking history" });
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};


module.exports = {
    updateUser,
    deleteUser,
    userById,
    readUser,
    readAllUsers,
    addBookingToUserHistory,
    readBookingHistory,
    addExperienceToUserFeedback
};

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