import React, { useEffect } from "react";
import MouseTwoToneIcon from "@mui/icons-material/MouseTwoTone";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../utils/actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
	const { loading, error, products } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	const alert = useAlert();
	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		dispatch(getProducts());
	}, [dispatch, error, alert]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="ECOMMERCE" />
					<div className="banner bg-gradient-to-r from-cyan-500 to-blue-500 h-[100vmin] flex flex-col text-center items-center justify-center text-white after:contents-[''] after:w-[100vw] after:h-[100vmin] after:bg-white after:absolute after:top-0 after:left-0 after:max-w-full ">
						<p className="font-normal text-[1.4vmax] font-['Lucida Sans']">
							Welcome to ECommerce
						</p>
						<h1 className=" m-[5vmax] font-semibold text-[2.5vmax] font-['Roboto']">
							Find products below
						</h1>
						<a href="#container">
							<button className=" mb-[5vmax] cursor-pointer bg-white border border-solid border-white rounded-none p-[1vmax] transition-all duration-500 w-[9vmax] font-medium text-[1vmax] font-['Roboto'] text-black hover:bg-black hover:text-white after:content-none after:w-[100vw] after:h-[100vmin] after:bg-white after:absolute after:top-0 after:left-0 after:max-w-full">
								Scroll
								<MouseTwoToneIcon />
							</button>
						</a>
					</div>
					<h2 className="homeHeading text-center font-['Roboto'] font-[1.4vmax] border-b-[1px] border-solid border-gray-700 w-[20vmax] p-[1vmax] mx-[5vmax] my-auto text-gray-800 self-center">
						Feature Products
					</h2>
					<div
						className="container flex my-[2vmax] mx-auto w-[80vw] flex-wrap justify-center max-w-full"
						id="container">
						{products && products.map((product) => <Product product={product} />)}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
