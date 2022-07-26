const router = require("express").Router();
const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken")
const { createAdventure, updateAdventure, deleteAdventure } = require("../controller/Adventure");
const { userById } = require("../controller/user")

router.post("/create/:userId", requireSignin, isAuth, isAdmin, createAdventure);
router.put("/update/:id/:userId", requireSignin, isAuth, isAdmin, updateAdventure);
router.delete("/delete/:id/:userId", requireSignin, isAuth, isAdmin, deleteAdventure);
router.param("userId", userById);
module.exports = router;