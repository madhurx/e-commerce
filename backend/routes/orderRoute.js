const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const {
	newOrder,
	getSingleOrder,
	myOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
} = require("../controllers/orderController");

router.post("/order/new", isAuthenticatedUser, newOrder);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/orders/me", isAuthenticatedUser, myOrders);
router.get("/admin/orders/", isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
router.put("/admin/order/:id", isAuthenticatedUser, authorizedRoles("admin"), updateOrder);
router.delete("/admin/order/:id", isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
