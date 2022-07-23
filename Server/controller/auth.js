//IMPORTING
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");


//FUNCTION TO REGISTER/SAVE USERS TO THE DB
const registerUser = async(req, res) => {
    try {
        //VALIDATE THE INPUT DATA
        //console.log("here1");
        const { error } = validate(req.body);
        //console.log("here2");
        if (error)
            return res.status(401).send({ message: error.details[0].message });

        //console.log("here1");
        const user = await User.findOne({ email: req.body.email });
        //console.log("check email")
        //console.log(user)
        if (user)
            return res.status(409).send({ message: "user with this email already exists!" });


        //GENERATE SALT FOR HASHING THE PASSWORD
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        //ENCRYPT THE PASSWORD
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //SAVE THE USER IN THE DB
        await new User({...req.body, password: hashPassword }).save();
        return res.status(201).send({ message: "Registered successfully" });

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
            return res.status(401).send({ message: "Invalid email  or password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "Invalid email or password" });

        //console.log("successful")
        const token = user.genAuthToken();
        res.status(200).send({ data: token, message: "Logged in Successfully" })
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = { loginUser, registerUser };

//VALIDATION FUNCTION USING JOI TO VALIDATE LOGIN DETAILS
const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
}