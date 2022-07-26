//IMPORTS
const router = require("express").Router();
const { requireSignin, isAuth, isAdmin } = require("../middleware/verifyToken")
const { createProduct, updateProduct, deleteProduct } = require("../controller/Products");
const { userById } = require("../controller/user")

//PRODUCT CRUD ROUTES
router.post("/create/:userId", requireSignin, isAuth, isAdmin, createProduct);
router.put("/update/:id/:userId", requireSignin, isAuth, isAdmin, updateProduct);
router.delete("/delete/:id/:userId", requireSignin, isAuth, isAdmin, deleteProduct);
router.param("userId", userById);

//EXPORT
module.exports = router;