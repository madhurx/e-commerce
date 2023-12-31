import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export const addItemsToCart = createAsyncThunk(
	"addItemsToCartSlice",
	async (idAndQuantity, { dispatch }) => {
		try {
			const { id, quantity } = idAndQuantity;
			const { data } = await axios.get(`/api/v1/product/${id}`);

			dispatch(
				addToCart({
					payload: {
						product: data.product._id,
						name: data.product.name,
						price: data.product.price,
						image: data.product.images[0].url,
						stock: data.product.Stock,
						quantity,
					},
				}),
			);
			localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
		} catch (error) {
			console.log(error);
		}
	},
);

export const removeItemsFromCart = createAsyncThunk(
	"removeItemsFromCartSlice",
	async (id, { dispatch }) => {
		try {
			dispatch(
				removeFromCart({
					payload: id,
				}),
			);
			localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
		} catch (error) {
			console.log(error);
		}
	},
);

export const saveShippingInfo = createAsyncThunk(
	"saveShippingInfoSlice",
	async (data, { dispatch }) => {
		try {
			dispatch(
				saveShippingInfo({
					payload: data,
				}),
			);
			localStorage.setItem("shippingInfo", JSON.stringify(data));
		} catch (error) {
			console.log(error);
		}
	},
);
