/*
 * CRUD OPERATIONS FOR PRODUCTS (ADMIN ONLY)
 */
// IMPORT
const { Bookings } = require('../models/bookings');

const bookingById = (req, res, next, id) => {
    Bookings.findById(id)
        .exec((err, booking) => {
            if (err || !booking) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.booking = booking;
            next();
        });
};

const createBookings = async(req, res) => {
    try {
        const price = req.adventure.price;
        const { participants, from, to } = req.body;
        const amount = participants * price;
        //CHECK IF THE PRODUCT ALREADY EXISTS BY THIS USER
        const booking = await Bookings.findOne({ user: req.profile._id, adventure: req.adventure._id });
        console.log("hello3")
        if (booking)
            return res.status(409).send({ message: "booking already exists" });

        //IF NOT EXISTING THEN POST THE PRODUCT
        await new Bookings({ from: from, to: to, participants: participants, user: req.profile._id, adventure: req.adventure._id, amount: amount, status: "booked" }).save();
        res.status(200).send({ message: "Booking done successfully" });

    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};

const readUserBookings = async(req, res) => {
    try {
        const id = req.profile._id;
        const bookingsByUser = await Bookings.find({ user: id });
        if (!bookingsByUser[0])
            return res.status(404).send({ message: "No bookings  by the user yet" });

        res.status(200).send(bookingsByUser);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

const readAllBookings = async(req, res) => {
    try {

        const bookingsByUsers = await Bookings.find({});
        if (!bookingsByUsers[0])
            return res.status(404).send({ message: "No bookings " });

        res.status(200).send(bookingsByUsers);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};
const readCompletedAdventures = async(req, res) => {
    try {
        const completedAdventures = await Bookings.find({ status: "completed" });
        if (!completedAdventures)
            return res.status(404).send({ message: "No completed adventures" });
        res.status(200).send(completedAdventures);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};
const readPendingAdventures = async(req, res) => {
    try {
        const pendingAdventures = await Bookings.find({ status: "pending" });
        if (!pendingAdventures)
            return res.status(404).send({ message: "No completed adventures" });
        res.status(200).send(pendingAdventures);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};
const readRecentAdventures = async(req, res) => {
    try {
        const pendingAdventures = await Bookings.find({ user: req.profile._id, status: "completed" });
        if (!pendingAdventures)
            return res.status(404).send({ message: "No completed adventures" });
        res.status(200).send(pendingAdventures);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};


const updateBookingStatus = async(req, res) => {
    try {

        //CHECK IF THE PRODUCT ALREADY EXISTS BY THIS USER
        await Bookings.findByIdAndUpdate({ _id: req.booking._id }, { $set: { status: req.body.status } });
        res.status(200).send({ message: "Bookings updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};


module.exports = { bookingById, readAllBookings, readCompletedAdventures, readPendingAdventures, readRecentAdventures, readUserBookings, createBookings, updateBookingStatus };