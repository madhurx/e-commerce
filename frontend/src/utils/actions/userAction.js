import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

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
        console.log("ACTIopn")

        const response = await axios.post("/api/v1/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log("Response:", response.data);
        return response.data

		// const { data } = await axios.post(`/api/v1/register`, formData, {
		// 	headers: { ...formData.getHeaders()},
		// });
		// console.log(data);
		// return data;
	} catch (error) {
        console.log(error.response.data)
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
