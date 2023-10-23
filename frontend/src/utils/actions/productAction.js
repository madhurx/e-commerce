import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("allProductsSlice", async (getProductsActionParams) => {
	try {
		let { keyword, currentPage, price, category } = getProductsActionParams;
		keyword = keyword || "";
		currentPage = currentPage || 1;
		price = price || [0, 100000];
		let fetchURL = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}`;
		if (category) {
			fetchURL = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&category=${category}`;
		}
		const data = await fetch(fetchURL);
		const result = await data.json();
		return result;
	} catch (error) {
		throw error;
	}
});

export const getProductDetail = createAsyncThunk("productDetailSlice", async (id) => {
	try {
		const data = await fetch(`/api/v1/product/${id}`);
		const result = await data.json();
		return result;
	} catch (error) {
		throw error;
	}
});
