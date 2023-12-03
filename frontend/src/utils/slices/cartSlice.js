import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: { cartItems: [] },
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
	default: (state) => {
		return state;
	},
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
