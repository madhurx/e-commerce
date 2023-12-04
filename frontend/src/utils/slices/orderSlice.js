import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
	name: "cart",
	initialState: {},
	reducers: {clearErrors: (state) => {
        state.error = null;
        return state;
    },},
    extraReducers:{},
});

export const {clearErrors  } = orderSlice.actions;
export default orderSlice.reducer;
