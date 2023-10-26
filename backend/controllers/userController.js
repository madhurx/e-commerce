const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a user
const registerUser = catchAsyncError(async (req, res, next) => {
	const myCloud = await cloudinary.v2.uploader.upload(req.files.avatar, {
		folder: 'eCommerce/avatars',
		width: 150,
		crop: "scale",
	});
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
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
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.clearCookie("token");

	res.status(200).json({
		success: true,
		message: "Logged Out",
	});
});

const forgetPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ErrorHandler("user not found", 404));
	}

	//get reset pass token
	const resetToken = await user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	const resetPassURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

	const message = `Reset your password : ${resetPassURL} \n\n If you not requested this email, then ignore it.`;
	try {
		await sendEmail({
			email: user.email,
			subject: `E-commerce password recovery`,
			message,
		});
		await res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
});

// reset password
const resetPassword = catchAsyncError(async (req, res, next) => {
	const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorHandler("reset password is not valid or expired", 404));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler(" password not match", 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();
	sendToken(user, 200, res);
});

//get user details
const getUserDetails = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		data: user,
	});
});

//update pass
const updatePassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");
	const isPasswordMatched = await user.comparePasswords(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Old password is incorrect", 400));
	}
	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler(" password not match", 400));
	}

	user.password = req.body.newPassword;
	await user.save();
	sendToken(user, 200, res);
});

const updateProfile = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};
	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		userFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

//get single user admin
const getSingleUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler("user not found", 404));
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});

//get users admin
const getAllUsers = catchAsyncError(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		data: users,
	});
});

//update user role
const updateUserRole = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		role: req.body.role,
	};
	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		userFindAndModify: false,
	});
	if (!user) {
		return next(new ErrorHandler("user not found", 404));
	}

	res.status(200).json({
		success: true,
	});
});

//delete user
const deleteUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHandler("user not found", 404));
	}

	await user.deleteOne();

	res.status(200).json({
		success: "user deleted successfully",
	});
});

module.exports = {
	registerUser,
	loginUser,
	logOut,
	forgetPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	getSingleUser,
	getAllUsers,
	updateUserRole,
	updateProfile,
	deleteUser,
};
