import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk("productSlice", async () => {
	try {
		// dispatch(allProductRequest);

		const data = await fetch("/api/v1/products/");
		const result = data.json();
		return result;
	} catch (error) {
		console.log(error);
	}
});

export const clearErrors = () => async (dispatch) => {
	dispatch(clearErrors());
};
