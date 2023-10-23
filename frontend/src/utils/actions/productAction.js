import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
	"allProductsSlice",
	async (keyword, currentPage) => {
		try {
            keyword = keyword || "";
            currentPage =  currentPage || 1;
            console.log(currentPage);
			let fetchURL = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
			const data = await fetch(fetchURL);
			const result = await data.json();
			return result;
		} catch (error) {
			throw error;
		}
	},
);

export const getProductDetail = createAsyncThunk("productDetailSlice", async (id) => {
	try {
		const data = await fetch(`/api/v1/product/${id}`);
		const result = await data.json();
		return result;
	} catch (error) {
		throw error;
	}
});
