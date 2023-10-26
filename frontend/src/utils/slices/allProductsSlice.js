import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productAction";

const allProductsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		loading: false,
		productsCount: 0,
		error: null,
		resultPerPage: 0,
        currentPage:0,
        filteredProductsCount:0
	},
	reducers: {
		clearErrors: (state) => {
			state.error = null;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.loading = true;
				state.products = [];
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.products;
				state.productsCount = action.payload.productCount;
				state.error = action.payload.error;
				state.resultPerPage = action.payload.resultPerPage;
                state.filteredProductsCount = action.payload.filteredProductsCount;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addDefaultCase((state) => {
				return state;
			});
	},
});

export const { clearErrors } = allProductsSlice.actions;

export default allProductsSlice.reducer;
