/*
 * IMPORTING
 */
const router = require("express").Router();
const {
    updateUser,
    deleteUser,
    userById,
    readUser,
    readAllUsers,
    readBookingHistory
} = require("../controller/user");
const { isAuth, requireSignin } = require("../middleware/verifyToken");


/* 
 * CREATE ROUTES FOR USER 
 */

router.put("/update/:userId", requireSignin, isAuth, updateUser); //UPDATE USER INFO,  ROUTE
router.delete("/delete/:userId", requireSignin, isAuth, deleteUser); //DELETE USER, ROUTE
router.get("/find/:userId", requireSignin, isAuth, readUser); //GET ONE USER, ROUTE
router.get("/findAll", requireSignin, isAuth, readAllUsers); //GET ALL USERS, ROUTE
router.get("/findBookingsByUser/:userId", requireSignin, isAuth, readBookingHistory); //GET BOOKINGS DONE BY USER, ROUTE
router.param("userId", userById); //GET USER BY ID PARAM 
//EXPORT ROUTES
module.exports = router;