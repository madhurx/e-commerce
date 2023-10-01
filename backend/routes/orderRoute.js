const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/order/new", isAuthenticatedUser, newOrder);