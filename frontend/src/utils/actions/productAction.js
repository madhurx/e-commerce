import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk("productSlice", async () => {
	try {
		const data = await fetch("api/v1/products/");
		const result = await data.json();
        console.log(result);
		return result;
	} catch (error) {
        console.log("er")
        throw error;
		// return isRejectedWithValue(error.response.data.message);
	}
});
