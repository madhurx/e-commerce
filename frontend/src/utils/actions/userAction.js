import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("userSlice", async (loginActionParams) => {
	try {
		let { email, password } = loginActionParams;

		const data = await fetch(`/api/v1/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const result = await data.json()
		return result;
	} catch (error) {
		throw error;
	}
});
