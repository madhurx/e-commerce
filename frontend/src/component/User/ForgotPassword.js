import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { loadUser, forgotPassword } from "../../utils/actions/userAction";
import { clearErrors } from "../../utils/slices/profileSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
const FormData = require("form-data");

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");

	const { error, message, loading } = useSelector((state) => state.profile);

	const forgotPasswordSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		formData.set("email", email);
		const forgotPasswordActionParams = { formData };

		dispatch(forgotPassword(forgotPasswordActionParams));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}
		if (message) {
			alert.success(message);
		}
	}, [dispatch, error, alert, message]);

	return (
		<>
			<MetaData title="Forgot Password" />
			<div className="forgotPasswordContainer">
				<div className="forgotPasswordBox">
					<h2 className="forgotPasswordHeading">Update Profile</h2>

					<form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
						<div className="forgotPasswordEmail">
							<MailOutlineIcon />
							<input
								type="email"
								placeholder="Email"
								required
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<input type="submit" value="Send" className="forgotPasswordBtn" />
					</form>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
