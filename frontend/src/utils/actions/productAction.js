// import { useDispatch } from "react-redux";

import { allProductFail, allProductRequest, allProductSuccess } from "../slices/productSlice";

export const getProduct = () => async (dispatch) => {
	try {
		dispatch(allProductRequest);
		const data = await fetch("/api/v1/products/");
        dispatch(allProductSuccess(data))
	} catch (error) {
		dispatch(allProductFail(error.response.data.message));
	}
};

export const clearErrors = () => async (dispatch) => {
    dispatch(clearErrors())

}

