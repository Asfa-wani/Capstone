//IMPORTING
const router = require("express").Router();
const { updateUser, deleteUser, userById, readUser, readBookingHistory } = require("../controller/user");
const { isAuth, requireSignin } = require("../middleware/verifyToken");



//CREATE ROUTES FOR USER 
router.put("/update/:userId", requireSignin, isAuth, updateUser);
router.delete("/delete/:userId", requireSignin, isAuth, deleteUser);
router.get("/find/:userId", requireSignin, isAuth, readUser);
router.get("/findBookingsByUser/:userId", requireSignin, isAuth, readBookingHistory);
router.param("userId", userById);
//EXPORT ROUTES
module.exports = router;