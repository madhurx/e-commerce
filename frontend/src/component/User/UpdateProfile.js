import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { loadUser, updateProfile } from "../../utils/actions/userAction";
import { clearErrors, resetUpdateUser } from "../../utils/slices/profileSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
const FormData = require("form-data");

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { userDetail } = useSelector((state) => state.user);

	const { isAuthenticated } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState("");
	const [avatarPreview, setAvatarPreview] = useState("");

	const updateProfileSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		formData.delete("name");
		formData.delete("email");
		formData.delete("password");
		formData.append("name", name);
		formData.append("email", email);
		formData.append("avatar", avatar);
		const updateProfileActionParams = { formData };

		dispatch(updateProfile(updateProfileActionParams));
	};

	const updateProfileDataChange = (e) => {
		const selectedFile = e.target.files && e.target.files[0];
		if (selectedFile) {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		}
	};

	useEffect(() => {
		if (userDetail) {
			setName(userDetail?.data?.name);
			setEmail(userDetail?.data?.email);
			setAvatarPreview(userDetail?.data?.avatar?.url);
		}
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
	}, [dispatch, error, alert, isUpdated, navigate, userDetail, setName, setAvatar, setEmail]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Update Profile" />
					<div className="updateProfileContainer">
						<div className="updateProfileBox">
							<h2 className="updateProfileHeading">Update Profile</h2>

							<form
								className="updateProfileForm"
								encType="multipart/form-data"
								onSubmit={updateProfileSubmit}>
								<div className="updateProfileName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="updateProfileEmail">
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

								<div id="updateProfileImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProfileDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Update Profile"
									className="updateProfileBtn"
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default UpdateProfile;
