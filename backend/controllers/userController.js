const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs")

// Register a user
const registerUser = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "sample id",
			url: "sampleUrl",
		},
	});

	sendToken(user, 201, res);
});

//login user
const loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler("Please enter email and password", 400));
	}

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}

	const isPasswordMatched = await bcrypt.compare(password, user.password);
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}

	sendToken(user, 200, res);
});

const logOut = catchAsyncError(async (req, res, next) => {
	// res.cookie("token", null, {
	// 	expires: new Date(Date.now()),
	// 	httpOnly: true,
	// });

    res.clearCookie("token");

	res.status(200).json({
		success: true,
		message: "Logged Out",
	});
});

module.exports = { registerUser, loginUser, logOut };
