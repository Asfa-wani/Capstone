//IMPORTING
const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/auth");
const { updateUser, deleteUser } = require("../controller/user");


//CREATE ROUTES FOR USER LOGIN AND REGISTER
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

//EXPORT ROUTES
module.exports = router;