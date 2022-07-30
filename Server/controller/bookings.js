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
        console.log(req.body);
        req.body.booking.user = req.profile;
        req.body.booking.adventure = req.adventure;

        //CHECK IF THE PRODUCT ALREADY EXISTS BY THIS USER
        const booking = await Bookings.findOne({ user: req.body.booking.user });
        if (booking)
            return res.status(409).send({ message: "booking already exists" });

        //IF NOT EXISTING THEN POST THE PRODUCT
        await new Bookings(req.body).save();
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
}
const readStatusValues = (req, res) => {
    res.json(Bookings.schema.path('status').enumValues);
};

const updateBookingStatus = async(req, res) => {
    try {

        //CHECK IF THE PRODUCT ALREADY EXISTS BY THIS USER
        await Bookings.findByIdAndUpdate({ _id: req.body.booking._id }, { $set: { status: req.body.status } });
        res.status(200).send({ message: "Bookings updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
};


module.exports = { bookingById, readAllBookings, readUserBookings, createBookings, updateBookingStatus, readStatusValues };