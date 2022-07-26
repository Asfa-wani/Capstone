//IMPORTING
const router = require("express").Router();
const { updateUser, deleteUser, userById } = require("../controller/user");
const { isAuth, requireSignin } = require("../middleware/verifyToken");



//CREATE ROUTES FOR USER 
router.put("/update/:userId", requireSignin, isAuth, updateUser);
router.delete("/delete/:userId", requireSignin, isAuth, deleteUser);

router.param("userId", userById);
//EXPORT ROUTES
module.exports = router;