//IMPORTING
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");

//CREATED LOGIN FUNCTION
const loginUser = async(req, res) => {
    try {
        //VALIDATE LOGIN CREDENTIALS
        const { error } = validate(req.body);
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

module.exports = { loginUser };

//VALIDATION FUNCTION USING JOI TO VALIDATE LOGIN DETAILS
const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
}