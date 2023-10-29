import { createSlice } from "@reduxjs/toolkit";
import { loadUser, login, logout, register } from "../actions/userAction";

const userSlice = createSlice({
	name: "user",
	initialState: {
		isAuthenticated: false,
		userDetail: { name: "", email: "" },
		loading: false,
		error: null,
	},
	reducers: {
		clearErrors: (state) => {
			state.error = null;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.isAuthenticated = false;
				state.userDetail = { name: "", email: "" };
				state.error = null;
				return state;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.success === true) {
					state.isAuthenticated = true;
				} else {
					state.isAuthenticated = false;
				}
				state.error = action.payload.error;
				state.userDetail = action.payload;
				return state;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.userDetail = null;
				state.error = action.payload.error;
				return state;
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.isAuthenticated = false;
				state.userDetail = { name: "", email: "" };
				state.error = null;
				return state;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.success === true) {
					state.isAuthenticated = true;
				} else {
					state.isAuthenticated = false;
				}
				state.error = action.payload.error;
				state.userDetail = action.payload;
				return state;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.userDetail = null;
				state.error = action.payload?.error;
				return state;
			})
			.addCase(loadUser.pending, (state) => {
				state.loading = true;
				state.isAuthenticated = false;
				state.userDetail = { name: "", email: "" };
				state.error = null;
				return state;
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.success === true) {
					state.isAuthenticated = true;
				} else {
					state.isAuthenticated = false;
				}
				state.error = action.payload.error;
				state.userDetail = action.payload;
				return state;
			})
			.addCase(loadUser.rejected, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.userDetail = null;
				state.error = action.payload?.error;
			})
            .addCase(logout.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.success === true) {
					state.isAuthenticated = true;
				} else {
					state.isAuthenticated = false;
				}
				state.error = action.payload.error;
				state.userDetail = null
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.error;
                return state;
			})
			.addDefaultCase((state) => {
				return state;
			});
	},
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
