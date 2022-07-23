//USER CRUD OPERATIONS

//IMPORT STATEMENTS
const joi = require("joi");
const { User, validate } = require("../models/user");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

//FUNCTION TO UPDATE USER INFO
const updateUser = async(req, res) => {
    try {
        const { name, password, address, phone, age } = req.body;
        const { error } = validateUpdate({ name, password, address, phone, age });

        if (error)
            return res.status(401).send({ message: error.details[0].message });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate({ _id: req.params.id }, {
            name: name,
            password: hashPassword,
            address: address,
            phone: phone,
            age: age
        }, { new: true });
        //console.log("check")
        //console.log(updatedUser)

        res.status(200).send({ message: "user updated successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }



}

module.exports = { updateUser };

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