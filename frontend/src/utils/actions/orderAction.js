import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("newOrderSlice", async (order, { dispatch }) => {
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
});

export const myOrders = createAsyncThunk("myOrdersSlice", async (order, { dispatch }) => {
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
});

export const getAllOrders = createAsyncThunk("getAllOrdersSlice", async (order, { dispatch }) => {
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
});

export const updateOrder = createAsyncThunk("updateOrderSlice", async (order, { dispatch }) => {
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
});
export const deleteOrder = createAsyncThunk("deleteOrderSlice", async (order, { dispatch }) => {
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
});

export const getOrderDetails = createAsyncThunk(
	"getOrderDetailsSlice",
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
