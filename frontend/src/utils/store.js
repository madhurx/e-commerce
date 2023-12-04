import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./slices/allProductsSlice";
import productDetailSlice from "./slices/productDetailSlice";
import userSlice from "./slices/userSlice";
import thunk from "redux-thunk";
import profileSlice from "./slices/profileSlice";
import cartSlice from "./slices/cartSlice";

const storedCartItems = localStorage.getItem("cartItems");
let parsedCartItems;
if (storedCartItems) {
	try {
		parsedCartItems = JSON.parse(storedCartItems);
	} catch (error) {
		console.error("Error parsing stored cart items:", error);
		parsedCartItems = [];
	}
} else {
	parsedCartItems = [];
}

const store = configureStore({
	reducer: {
		products: allProductsSlice,
		productDetail: productDetailSlice,
		user: userSlice,
		profile: profileSlice,
		cart: cartSlice,
	},
	middleware: [thunk],
	initialState: {
		cart: {
			cartItems: parsedCartItems,
		},
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
});

export default store;
