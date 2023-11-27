import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { loadUser, login, register } from "../../utils/actions/userAction";
import { clearErrors } from "../../utils/slices/profileSlice";
const FormData = require("form-data");

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { userDetail } = useSelector((state) => state.user);


	const { isAuthenticated } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);


    const{ name, setName} = useState(userDetail.name)
    const{ email, setEmail} = useState(userDetail.email)
    const{ avatar, setAvatar} = useState()
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const registerSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		formData.delete("name");
		formData.delete("email");
		formData.delete("password");
		formData.append("name", name);
		formData.append("email", email);
		formData.append("avatar", avatar);
		const registerActionParams = { formData };

		dispatch(register(registerActionParams));
	};

	const registerDataChange = (e) => {
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
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}
		if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser);
			navigate("/account");
            dispatch()
		}
	}, [dispatch, error, alert, isUpdated, navigate]);

	return <div></div>;
};

export default UpdateProfile;
