import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./slices/allProductsSlice";
import productDetailSlice from "./slices/productDetailSlice";

const store = configureStore({
	reducer: {
		products: allProductsSlice,
		productDetail: productDetailSlice,
	},
});

export default store;
