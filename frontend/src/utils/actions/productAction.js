import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk("productSlice", async () => {
	try {
		const data = await fetch("api/v1/products/");
		const result = await data.json();
		return result;
	} catch (error) {
		return isRejectedWithValue(error.response.data.message);
	}
});
