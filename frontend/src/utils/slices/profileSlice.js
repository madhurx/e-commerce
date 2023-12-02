import { createSlice } from "@reduxjs/toolkit";
import { updateProfile , updatePassword, forgotPassword, resetPassword} from "../actions/userAction";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		loading: false,
		isUpdated: false,
		isDeleted: false,
		message: "",
		error: null,
        success:false
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
			})
            .addCase(updatePassword.pending, (state) => {
				state.loading = false;
				return state;
			})
			.addCase(updatePassword.fulfilled, (state, action) => {
				state.loading = false;
				state.isUpdated = action.payload;
				return state;
			})
			.addCase(updatePassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				return state;
			}).addCase(forgotPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
				return state;
			})
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.isUpdated = action.payload;
				return state;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				return state;
			}).addCase(resetPassword.pending, (state, action) => {
				state.loading = true;
				state.error = action.payload;
				return state;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				return state;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				return state;
			});
	},
});

export const { clearErrors, resetUpdateUser } = profileSlice.actions;
export default profileSlice.reducer;
