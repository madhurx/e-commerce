const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = catchAsyncError(async (req, res, next) => {

	const myPayment = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: "inr",
		metadata: {
			company: "Ecommerce",
		},
	});
	res.status(200).send({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = catchAsyncError(async (req, res, next) => {

	res.status(200).send({ stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = { processPayment, sendStripeApiKey };
