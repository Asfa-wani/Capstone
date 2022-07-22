//IMPORTING
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

//FUNCTION TO REGISTER/SAVE USERS TO THE DB
const registerUser = async(req, res) => {
    try {
        //VALIDATE THE INPUT DATA
        console.log("here1");
        const { error } = validate(req.body);
        console.log("here2");
        if (error)
            return res.status(401).send({ message: error.details[0].message });

        console.log("here1");
        const user = await User.findOne({ email: req.email });
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

module.exports = { registerUser };