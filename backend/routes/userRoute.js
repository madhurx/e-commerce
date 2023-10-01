const express = require("express");
const {
	registerUser,
	loginUser,
	logOut,
	forgetPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	updateProfile,
	getSingleUser,
	getAllUsers,
	updateUserRole,
	deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.post("/password/forgot", forgetPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get("/admin/users", isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router.get("/admin/user/:id", isAuthenticatedUser, authorizedRoles("admin"), getSingleUser);
router.put("/admin/user/:id", isAuthenticatedUser, authorizedRoles("admin"), updateUserRole);
router.delete("/admin/user/:id", isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
