const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
	const { token } = req.cookies;
	if (!token) {
		return next(new ErrorHandler("Please login to access these resource", 401));
	}

	const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decodedData.id);
	next();
});

const authorizedRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(`Role: ${req.user.role} is not allowed to access the resource`, 403),
			);
		}
		next();
	};
};

module.exports = { isAuthenticatedUser, authorizedRoles };
