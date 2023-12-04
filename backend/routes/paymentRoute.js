const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
