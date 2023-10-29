import { createAsyncThunk } from "@reduxjs/toolkit";

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

		const data = await fetch(`/api/v1/register`, {
			method: "POST",
			body: formData,
		});
		const result = await data.json();
		console.log(result);
		return result;
	} catch (error) {
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