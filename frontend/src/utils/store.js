import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./slices/allProductsSlice";
import productDetailSlice from "./slices/productDetailSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
	reducer: {
		products: allProductsSlice,
		productDetail: productDetailSlice,
		user: userSlice,
	},
});

export default store;
