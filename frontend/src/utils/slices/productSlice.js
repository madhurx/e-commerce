import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../actions/productAction";

const productSlice = createSlice({
	name: "product",
	initialState: {
		products: [],
		loading: false,
		productsCount: 0,
		error: null,
	},
	extraReducers: {
		[getProduct.pending]: (state) => {
			state.loading = true;
			state.products = [];
		},
		[getProduct.fulfilled]: (state, action) => {
			state.loading = false;
			state.products = action.payload.products;
			state.productsCount = action.payload.productsCount;
		},
		[getProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { allProductRequest, allProductSuccess, allProductFail, clearErrors } =
	productSlice.actions;

export default productSlice.reducer;
