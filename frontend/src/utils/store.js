import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./slices/allProductsSlice";
import productDetailSlice from "./slices/productDetailSlice";
import userSlice from "./slices/userSlice";
import thunk from "redux-thunk";
import profileSlice from "./slices/profileSlice";

const store = configureStore({
	reducer: {
		products: allProductsSlice,
		productDetail: productDetailSlice,
		user: userSlice,
		profile: profileSlice,
	},
	middleware: [thunk],
});

export default store;
