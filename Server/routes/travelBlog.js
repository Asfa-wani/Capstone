const router = require("express").Router();
const { requireSignin, isAuth } = require("../middleware/verifyToken")
const { createTravelBlog, updateTravelBlog, deleteTravelBlog } = require("../controller/travelBlog");
const { userById } = require("../controller/user")


router.post("/create/:userId", requireSignin, isAuth, createTravelBlog);
router.put("/update/:id/:userId", requireSignin, isAuth, updateTravelBlog);
router.delete("/delete/:id/:userId", requireSignin, isAuth, deleteTravelBlog);
router.param("userId", userById);

module.exports = router;