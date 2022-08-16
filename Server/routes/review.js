/* 
 * IMPORTS
 */
const router = require("express").Router();
const { requireSignin, isAuth } = require("../middleware/verifyToken")
const {
    createReview,
    updateReview,
    deleteReview,
    readReview,
    readUserReviews,
    readDestinationReview,
    readDestReviewByUser,
    readPopularDestinations
} = require("../controller/reviews");
const { userById } = require("../controller/user");
const { reviewById } = require("../controller/reviews");
const { adventureById, addReviewToAdventure, } = require("../controller/adventure");

//REVIEW CRUD ROUTES
router.post("/create/:userId/:adventureId", requireSignin, isAuth, addReviewToAdventure, createReview);
router.put("/update/:reviewId/:userId", requireSignin, isAuth, updateReview);
router.delete("/delete/:reviewId/:userId", requireSignin, isAuth, deleteReview);
router.get("/find/:userId", requireSignin, isAuth, readUserReviews);
router.get("/findAdventureReview/:adventureId/", readDestinationReview);
router.get("/findAdventReviewByUser/:adventureId/:userId", requireSignin, isAuth, readDestReviewByUser);
router.get("/findpopularadventure", readPopularDestinations);
router.get("/findReview/:reviewId", readReview);
router.param("userId", userById);
router.param("reviewId", reviewById);
router.param("adventureId", adventureById);


//EXPORTS
module.exports = router;