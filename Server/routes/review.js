//IMPORTS
const router = require("express").Router();
const { requireSignin, isAuth } = require("../middleware/verifyToken")
const { createReview, updateReview, deleteReview } = require("../controller/reviews");
const { userById } = require("../controller/user")

//REVIEW CRUD ROUTES
router.post("/create/:userId", requireSignin, isAuth, createReview);
router.put("/update/:id/:userId", requireSignin, isAuth, updateReview);
router.delete("/delete/:id/:userId", requireSignin, isAuth, deleteReview);
router.param("userId", userById);

//EXPORTS
module.exports = router;