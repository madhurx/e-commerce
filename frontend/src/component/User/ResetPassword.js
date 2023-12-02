import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { loadUser, resetPassword } from "../../utils/actions/userAction";
import { clearErrors } from "../../utils/slices/profileSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
const FormData = require("form-data");

const ResetPassword = (match) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { error, message, success } = useSelector((state) => state.profile);

	const resetPasswordSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		formData.set("password", password);
		formData.set("confirmPassword", confirmPassword);
		const resetPasswordActionParams = { formData };

		dispatch(resetPassword(resetPasswordActionParams));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}
		if (success) {
			alert.success("Password Updated successfully");
			navigate("/login");
		}
	}, [dispatch, error, alert, success, navigate]);

	return (
		<>
			<MetaData title="Forgot Password" />
			<div className="resetPasswordContainer">
				<div className="resetPasswordBox">
					<h2 className="resetPasswordHeading">Update Profile</h2>

					<form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
						<div>
							<MailOutlineIcon />
							<input
								type="password"
								placeholder="Password"
								required
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<MailOutlineIcon />
							<input
								type="password"
								placeholder="Confirm Password"
								required
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>

						<input type="submit" value="Update" className="resetPasswordBtn" />
					</form>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
