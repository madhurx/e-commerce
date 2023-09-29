const express = require("express");
const { registerUser, loginUser, logOut, forgetPassword } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgetPassword);

router.get("/logout", logOut);

module.exports = router;
