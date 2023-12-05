import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
	"newOrderSlice",
	async (order, { dispatch }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post("/api/v1/order/new", order, config);
			const result = await data.json();
			return result;
		} catch (error) {
			console.log(error);
		}
	},
);
