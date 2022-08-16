/* 
 * IMPORTS
 */
const router = require("express").Router();
const { requireSignin, isAuth } = require("../middleware/verifyToken")
const {
    createTravelBlog,
    updateTravelBlog,
    deleteTravelBlog,
    readTravelBlog,
    travelBlogById,
    readAllTravelBlogs,
    readUserTravelBlog
} = require("../controller/travelBlog");
const { userById } = require("../controller/user")

//TRAVEL BLOGS CRUD ROUTES
router.post("/create/:userId", requireSignin, isAuth, createTravelBlog);
router.put("/update/:travelBlogId/:userId", requireSignin, isAuth, updateTravelBlog);
router.delete("/delete/:id/:userId", requireSignin, isAuth, deleteTravelBlog);
router.get("/findTravelBlogs/:travelBlogId", readTravelBlog);
router.get("/findUserBlogs/:userId", requireSignin, isAuth, readUserTravelBlog);
router.get("/findBlogs/", readAllTravelBlogs);


router.param("userId", userById);
router.param("travelBlogId", travelBlogById);

//EXPORT
module.exports = router;