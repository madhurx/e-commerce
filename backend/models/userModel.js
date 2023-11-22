const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "Please enter your name"],
		maxLength: [30, "Name cannot exceed 30 chars"],
		minLength: [2, "Name should be 4 chars atleast"],
	},
	email: {
		type: String,
		require: [true, "Please enter your email"],
		unique: true,
		validate: [validator.isEmail, "please enter valid email"],
	},
	password: {
		type: String,
		require: [true, "Please enter your password"],
		maxLength: [10, "Password cannot exceed 10 chars"],
		minLength: [4, "Password should be 6 chars atleast"],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

userSchema.methods.comparePasswords = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// password reset
userSchema.methods.getResetPasswordToken = async function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
	this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
	return resetToken;
};

module.exports = mongoose.model("User", userSchema);
