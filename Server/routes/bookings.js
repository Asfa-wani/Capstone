const router = require("express").Router();

const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken");
const { userById, addBookingToUserHistory } = require("../controller/user");
const {
    createBookings,
    readUserBookings,
    readAllBookings,
    readStatusValues,
    bookingById,
    updateBookingStatus
} = require("../controller/bookings");

router.post(
    "/create/:userId",
    requireSignin,
    isAuth,
    addBookingToUserHistory,
    createBookings
);

router.get("/find/:userId", requireSignin, isAuth, isAdmin, readUserBookings, );
router.get("/findAll/:userId", requireSignin, isAuth, isAdmin, readAllBookings, );
router.get(
    "/status-values/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    readStatusValues,
);
router.put(
    "/:bookingId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateBookingStatus
);
router.param("userId", userById);
router.param("bookingId", bookingById);

module.exports = router;