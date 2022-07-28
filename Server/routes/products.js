//IMPORTS
const router = require("express").Router();
const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken")
const { createProduct, updateProduct, deleteProduct, readAllProdocts, readProduct, productById } = require("../controller/Products");
const { userById } = require("../controller/user")

//PRODUCT CRUD ROUTES
router.post("/create/:userId", requireSignin, isAuth, isAdmin, createProduct);
router.put("/update/:id/:userId", requireSignin, isAuth, isAdmin, updateProduct);
router.delete("/delete/:id/:userId", requireSignin, isAuth, isAdmin, deleteProduct);
router.get("/findProducts", readAllProdocts);
router.get("/findProduct/:productId", readProduct);
router.param("userId", userById);
router.param("productId", productById);

//EXPORT
module.exports = router;