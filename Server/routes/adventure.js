const router = require("express").Router();
const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken")
const { createAdventure, updateAdventure, deleteAdventure } = require("../controller/adventure");
const { userById } = require("../controller/user");
const { adventureById } = require("../controller/adventure")

router.post("/create/:userId", requireSignin, isAuth, isAdmin, createAdventure);
router.put("/update/:adventureId/:userId", requireSignin, isAuth, isAdmin, updateAdventure);
router.delete("/delete/:adventureId/:userId", requireSignin, isAuth, isAdmin, deleteAdventure);
router.param("userId", userById);
router.param("adventureId", adventureById);
module.exports = router;