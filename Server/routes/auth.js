/* 
 * IMPORTING
 */
const router = require("express").Router();
const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controller/auth");

//CREATE ROUTES FOR USER LOGIN AND REGISTER
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

//EXPORT ROUTES
module.exports = router;