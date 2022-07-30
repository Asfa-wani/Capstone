//IMPORT STATEMENTS
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//CREATING BOOKINGS SCHEMA
const bookingsSchema = new mongoose.Schema({

    user: { type: ObjectId, ref: "User", required: true, },
    adventure: { type: ObjectId, ref: "Adventure", required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    participants: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        default: "Not Booked",
        // enum means string objects
    },


});

//CREATING THE MODEL
const Bookings = mongoose.model("bookings", bookingsSchema);
module.exports = { Bookings };