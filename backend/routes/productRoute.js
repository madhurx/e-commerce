const express = require("express");
const router = express.Router();
const {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.get("/products",  getAllProducts);
router.post("/product/new", isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.put("/product/:id", isAuthenticatedUser, authorizedRoles("admin"), updateProduct);
router.delete("/product/:id", isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
router.get("/product/:id", getProductDetails);

module.exports = router;
