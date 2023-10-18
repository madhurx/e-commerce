import { createSlice } from "@reduxjs/toolkit";
import { getProductsDetails } from "../actions/productAction";

const productDetailSlice = createSlice({
	name: "productDetail",
	initialState: {
		product: {},
		error: null,
		loading: false,
	},
	reducers: {
		clearErrors: (state) => {
			state.error = null;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProductsDetails.pending, (state) => {
				state.loading = true;
				return state;
			})
			.addCase(getProductsDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload.product;
				state.error = action.payload.error;
			})
			.addCase(getProductsDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default productDetailSlice.reducer;
export const { clearErrors } = productDetailSlice.actions;
