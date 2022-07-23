//IMPORTING
const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/auth");


//CREATE ROUTES FOR USER LOGIN AND REGISTER
router.post("/register", registerUser);
router.post("/login", loginUser);

//EXPORT ROUTES
module.exports = router;