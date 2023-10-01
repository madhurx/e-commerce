const express = require("express");
const router = express.Router();
const {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.get("/products", getAllProducts);
router.post("/admin/product/new", isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.put("/admin/product/:id", isAuthenticatedUser, authorizedRoles("admin"), updateProduct);
router.delete("/admin/product/:id", isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
router.get("/product/:id", getProductDetails);
router.put("/product/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", getProductReviews);
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
