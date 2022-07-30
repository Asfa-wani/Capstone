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
        enum: ["Not Booked", "Booked", "Completed", "Cancelled"] // enum means string objects
    },
    updated: Date,

});

//CREATING THE MODEL
const Bookings = mongoose.model("bookings", bookingsSchema);
module.exports = { Bookings };