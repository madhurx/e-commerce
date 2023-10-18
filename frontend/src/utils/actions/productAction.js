import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("allProductsSlice", async () => {
	try {
		const data = await fetch("api/v1/products/");
		const result = await data.json();
		return result;
	} catch (error) {
        throw error;
	}
});

export const getProductsDetails = createAsyncThunk("productDetailSlice", async (id) => {
    try {
		const data = await fetch(`api/v1/product/${id}`);
		const result = await data.json();
        console.log(result);
		return result;


    } catch (error) {
        throw error;
        
    }
})
