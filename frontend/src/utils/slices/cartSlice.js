import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: { cartItems: [], shippingInfo: {} },
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const isItemExist = state.cartItems.find((i) => i.payload.product === item.product);
			if (isItemExist) {
				state.cartItems = state.cartItems.map((i) =>
					i.payload.product === isItemExist.payload.product ? item : i,
				);
			} else {
				state.cartItems = [...state.cartItems, item];
				return state;
			}
		},
	},
	removeFromCart: (state, action) => {
		state.cartItems = state.cartItems.filter((i) => i.payload.product !== action.payload);
		return state;
	},
	saveShippingInfo: (state, action) => {
		state.shippingInfo = action.payload;
		return state;
	},
	default: (state) => {
		return state;
	},
});

export const { addToCart, removeFromCart, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
