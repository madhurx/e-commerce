import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updatePassword } from "../../utils/actions/userAction";
import { clearErrors, resetUpdateUser } from "../../utils/slices/profileSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const FormData = require("form-data");

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { isAuthenticated } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const updatePasswordSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set("oldPassword", oldPassword);
		formData.set("newPassword", newPassword);
		formData.set("confirmPassword", confirmPassword);
		const updatePasswordActionParams = { formData };

		dispatch(updatePassword(updatePasswordActionParams));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}
		if (isUpdated) {
			alert.success("Profile Updated Successfully");
			dispatch(loadUser);
			navigate("/account");
			dispatch(resetUpdateUser());
		}
	}, [dispatch, error, alert, isUpdated, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Change Password" />
					<div className="updatePasswordContainer">
						<div className="updatePasswordBox">
							<h2 className="updatePasswordHeading">Update Profile</h2>

							<form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
								<div className="loginPassword">
									<VpnKeyIcon />
									<input
										type="password"
										placeholder="Old Password"
										required
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
									/>
								</div>
								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="New Password"
										required
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
								</div>
								<div className="loginPassword">
									<LockIcon />
									<input
										type="password"
										placeholder="Confirm Password"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>

								<input
									type="submit"
									value="Change Password"
									className="updatePasswordBtn"
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default UpdatePassword;
