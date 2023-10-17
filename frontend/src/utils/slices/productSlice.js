import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../actions/productAction";

const productSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		loading: false,
		productsCount: 0,
		error: null,
	},
	reducers: {
		clearErrors: (state) => {
			state.error = null;
		},
	},
	extraReducers: {
		[getProduct.pending]: (state) => {
			state.loading = true;
			state.products = [];
		},
		[getProduct.fulfilled]: (state, action) => {
			state.loading = false;
			state.products = action.payload.products;
			state.productsCount = action.payload.productCount;
		},
		[getProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { clearErrors } = productSlice.actions;

export default productSlice.reducer;
