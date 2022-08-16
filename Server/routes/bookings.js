const router = require("express").Router();

const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken");
const { userById, addBookingToUserHistory } = require("../controller/user");
const { adventureById } = require("../controller/adventure")
const {
    createBookings,
    readUserBookings,
    readAllBookings,
    readStatusValues,
    bookingById,
    updateBookingStatus
} = require("../controller/bookings");

router.post(
    "/create/:userId/:adventureId",
    requireSignin,
    isAuth,
    addBookingToUserHistory,
    createBookings
);

router.get("/find/:userId", requireSignin, isAuth, readUserBookings, );
router.get("/findAll/:userId", requireSignin, isAuth, isAdmin, readAllBookings, );

router.put(
    "/update/status/:bookingId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateBookingStatus
);
router.param("userId", userById);
router.param("bookingId", bookingById);
router.param("adventureId", adventureById);

module.exports = router;