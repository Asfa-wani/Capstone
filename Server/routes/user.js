//IMPORTING
const router = require("express").Router();
const { registerUser } = require("../controller/register");
const { loginUser } = require("../controller/login");

//CREATE ROUTES FOR USER LOGIN AND REGISTER
router.post("/register", registerUser);
router.post("/login", loginUser);

//EXPORT ROUTES
module.exports = router;