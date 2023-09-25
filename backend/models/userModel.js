const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "Please enter your name"],
		maxLength: [30, "Name cannot exceed 30 chars"],
		minLength: [4, "Name should be 4 chars atleast"],
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
		role: {
			type: String,
			default: "user",
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
});

module.exports = mongoose.model("User", userSchema);
