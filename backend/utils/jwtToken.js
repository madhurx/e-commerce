const jwt = require("jsonwebtoken");
const user = require('../models/userModel');

//creating token and saving in cookie
const sendToken = (user, statusCode, res) => {
	// const token = user.getJWTToken();
    console.log({user}.user.id);

	const token = jwt.sign({user}, process.env.JWT_SECRET);

	// options for cookie
	const options = {
		expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		user,
		token,
	});
};
module.exports = sendToken;
