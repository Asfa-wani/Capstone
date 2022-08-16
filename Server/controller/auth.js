/* 
 * USER LOGIN AND REGISTER FUNCTIONS
 */

//IMPORTS
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");


//FUNCTION TO REGISTER/SAVE USERS TO THE DB
const registerUser = async(req, res) => {
    try {
        //VALIDATE THE INPUT DATA
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with this email already exists!" });


        //GENERATE SALT FOR HASHING THE PASSWORD USING BCRYPT
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        //ENCRYPT THE PASSWORD
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //SAVE THE USER IN THE DB
        await new User({...req.body, password: hashPassword }).save();
        return res.status(201).send({ message: "Registered successfully!" });

    } catch (error) {

        res.status(500).send({ message: "server error" });
    }
};



//CREATED LOGIN FUNCTION
const loginUser = async(req, res) => {
    try {
        //VALIDATE LOGIN CREDENTIALS
        const { error } = validateLogin(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        //SEARCH USER IN DB
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid email  or password!" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "Email and password do not match!" });

        const token = user.genAuthToken();
        //PERSIST THE TOKEN WITH EXPIRY DATE AS ACCESS_TOKEN IN COOKIES
        res.cookie("access_token", token, { expire: new Date() + 9999 });
        res.status(200).send({ data: token, message: "Logged in Successfully!" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error!" });
    }
};

//FUNCTION FOR SIGNING OUT
const logoutUser = async(req, res) => {
    res.clearCookie("access_token");
    res.status(200).send({ message: "Sign out successful!" });
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser
};

//VALIDATION FUNCTION USING JOI TO VALIDATE LOGIN DETAILS
const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
}