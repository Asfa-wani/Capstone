const router = require("express").Router();

const { adventCategoryById, readAllAdventCategories, updateAdventCategory, createAdventCategory, readAdventCategory, deleteAdventCategory } = require("../controller/adventureCategory");
const { userById } = require("../controller/user");
const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken");


router.post('/create/:userId', requireSignin, isAuth, isAdmin, createAdventCategory);
router.put('/update/:adventCategoryId/:userId', requireSignin, isAuth, isAdmin, updateAdventCategory);
router.delete('/delete/:adventCategoryId/:userId', requireSignin, isAuth, isAdmin, deleteAdventCategory);
router.get('/findadventCategories', readAllAdventCategories);
router.get('/findadventCategory/:prodCategoryId', readAdventCategory);
router.param('adventCategoryId', adventCategoryById);
router.param("userId", userById);

module.exports = router;