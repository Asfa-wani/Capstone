const { urlencoded } = require("express");
const mongoose = require("mongoose");

module.exports = () => {
    try {
        mongoose.connect(
            process.env.DATABASE, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        );
        console.log("Connected successfully");
    } catch (error) {
        console.log(error);
    }
};