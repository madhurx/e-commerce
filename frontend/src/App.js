import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";

function App() {
	useEffect(() => {
		webFont.load({
			google: {
				families: [
					"Roboto:300,400,500,600,700,800,900",
					"Poppins:300,400,500,600,700,800,900",
					"Droid Sans:300,400,500,600,700,800",
				],
			},
		});
	}, []);

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<div className="flex flex-col">
					<Header />
					<Home />
					<Footer />
				</div>
			),
		},
		{
			path: "/product/:id",
			element: (
				<div>
					<Header />
					<ProductDetails />
					<Footer />
				</div>
			),
		},
		{
			path: "/loaderTest",
			element: (
				<div>
					<Header />
					<Loader />
					<Footer />
				</div>
			),
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
