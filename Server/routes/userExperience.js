/*
 * IMPORTS
 */
const router = require("express").Router();
const { requireSignin, isAuth } = require("../middleware/verifyToken")
const {
    createUserExperience,
    updateUserExperience,
    deleteUserExperience,
    readUserExperience,
    readAllUsersExperiences,
} = require("../controller/userExperience");
const { userById } = require("../controller/user");
const { userExperienceById } = require("../controller/userExperience");

//USER EXPERIENCE CRUD ROUTES
router.post("/create/:userId", requireSignin, isAuth, createUserExperience);
router.put("/update/:userExperienceId/:userId", requireSignin, isAuth, updateUserExperience);
router.delete("/delete/:userExperienceId/:userId", requireSignin, isAuth, deleteUserExperience);
router.get("/find/:userId", requireSignin, isAuth, readUserExperience);
router.get("/findAllUserExperiences", readAllUsersExperiences);


router.param("userId", userById);
router.param("userExperienceId", userExperienceById);



//EXPORTS
module.exports = router;