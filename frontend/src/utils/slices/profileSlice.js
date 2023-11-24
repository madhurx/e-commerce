import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		loading: false,
		isUpdated: false,
		isDeleted: false,
		message: "",
		error: null,
	},
	reducers: {
		clearErrors: (state) => {
			state.error = null;
			return state;
		},
	},
});

export const { clearErrors } = profileSlice.actions;
export default profileSlice.reducer;
