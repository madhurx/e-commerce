import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../actions/userAction";

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

		resetUpdateUser: (state) => {
			state.isUpdated = false;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateProfile.pending, (state) => {
				state.loading = false;
				return state;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.isUpdated = action.payload;
				return state;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				return state;
			});
	},
});

export const { clearErrors, resetUpdateUser } = profileSlice.actions;
export default profileSlice.reducer;
