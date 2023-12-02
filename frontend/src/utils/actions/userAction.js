import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const login = createAsyncThunk("userLoginSlice", async (loginActionParams) => {
	try {
		let { email, password } = loginActionParams;

		const data = await fetch(`/api/v1/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const result = await data.json();
		return result;
	} catch (error) {
		throw error;
	}
});

export const register = createAsyncThunk("userRegisterSlice", async (registerActionParams) => {
	try {
		let { formData } = registerActionParams;

		// for (const entry of formData.entries()) {
		//     console.log(entry);
		//   }

		const response = await axios.post("/api/v1/register", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data);
		throw error;
	}
});

export const loadUser = createAsyncThunk("userLoadSlice", async () => {
	try {
		const data = await fetch(`/api/v1/me`);
		const result = await data.json();
		return result;
	} catch (error) {
		throw error;
	}
});

export const logout = createAsyncThunk("userLogout", async () => {
	try {
		const data = await fetch(`/api/v1/logout`);
		const result = await data.json();
		return result;
	} catch (error) {
		throw error;
	}
});

export const updateProfile = createAsyncThunk(
	"updateProfileSlice",
	async (updateProfileActionParams) => {
		try {
			let { formData } = updateProfileActionParams;
			// for (const entry of formData.entries()) {
			//         console.log(entry);
			//       }
			const response = await axios.put("/api/v1/me/update", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},
);

export const updatePassword = createAsyncThunk(
	"updatePasswordSlice",
	async (updatePasswordActionParams) => {
		try {
            let { formData }   = updatePasswordActionParams;
			// for (const entry of formData.entries()) {
			//         console.log(entry);
			//       }

			const data = await axios.put(
				`/api/v1/password/update`,
				formData,
				{
					headers: { "Content-Type": "application/json" }
				},
				// body: JSON.stringify({oldPassword, newPassword, confirmPassword}),
			);
			const result = await data.json();

			// const data = await fetch(`/api/v1/me/update`);
			// const result = await data.json();
			return result;
		} catch (error) {
			throw error;
		}
	},
);
