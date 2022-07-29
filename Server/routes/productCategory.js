const router = require("express").Router();

const { prodCategoryById, readAllProdCategories, updateProdCategory, createProdCategory, readProdCategory, deleteProdCategory } = require("../controller/productCategory");
const { userById } = require("../controller/user");
const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken");


router.post('/create/:userId', requireSignin, isAuth, isAdmin, createProdCategory);
router.put('/update/:prodCategoryId/:userId', requireSignin, isAuth, isAdmin, updateProdCategory);
router.delete('/delete/:prodCategoryId/:userId', requireSignin, isAuth, isAdmin, deleteProdCategory);
router.get('/findProdCategories', readAllProdCategories);
router.get('/findProdCategory/:prodCategoryId', readProdCategory);
router.param('prodCategoryId', prodCategoryById);
router.param("userId", userById);

module.exports = router;