//IMPORTING
const router = require("express").Router();
const { registerUser } = require("../controller/user/register");
const { loginUser } = require("../controller/user/login");

//CREATE ROUTES FOR USER LOGIN AND REGISTER
router.post("/register", registerUser);
router.post("/login", loginUser);

//EXPORT ROUTES
module.exports = router;