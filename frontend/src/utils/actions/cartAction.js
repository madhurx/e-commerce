import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store";
import { addToCart } from "../slices/cartSlice";

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
