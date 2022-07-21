//IMPORT MONGOOSE
const mongoose = require("mongoose");

//CREATING CONNECTION TO MONGO DB
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