import { createSlice } from "@reduxjs/toolkit";
import { getProductDetail } from "../actions/productAction";

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
			.addCase(getProductDetail.pending, (state) => {
				state.loading = true;
				return state;
			})
			.addCase(getProductDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload.product;
				state.error = action.payload.error;
			})
			.addCase(getProductDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addDefaultCase((state) => {
				return state;
			});
	},
});

export default productDetailSlice.reducer;
export const { clearErrors } = productDetailSlice.actions;
