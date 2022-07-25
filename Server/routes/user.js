//IMPORTING
const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/auth");
const { updateUser, deleteUser, userById } = require("../controller/user");
const { isAuth, isAdmin, requireSignin } = require("../middleware/verifyToken");



//CREATE ROUTES FOR USER LOGIN AND REGISTER
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:userId", requireSignin, isAuth, updateUser);
router.delete("/delete/:userId", requireSignin, isAuth, deleteUser);

router.param("userId", userById);
//EXPORT ROUTES
module.exports = router;