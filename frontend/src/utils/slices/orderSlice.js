import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../actions/orderAction";

const orderSlice = createSlice({
	name: "cart",
	initialState: { loading: true, order: {}, error: null },
	reducers: {
		clearErrors: (state) => {
			state.error = null;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state, action) => {
				state.loading = true;
				return state;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.order = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addDefaultCase((state) => state);
	},
});

export const { clearErrors } = orderSlice.actions;
export default orderSlice.reducer;
