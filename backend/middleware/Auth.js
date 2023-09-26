const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
	const { token } = req.cookies;
	if (!token) {
		return next(new ErrorHandler("Please login to access these resource", 401));
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decodedData.id);
	next();
});

module.exports = isAuthenticatedUser;
