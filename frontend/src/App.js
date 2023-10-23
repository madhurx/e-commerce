import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";

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

	const AppLayout = () => {
		return (
			<div className="flex flex-col">
				<Header />
				<Outlet />
				<Footer />
			</div>
		);
	};
	const router = createBrowserRouter([
		{
			path: "/",
			element: <AppLayout />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/product/:id",
					element: <ProductDetails />,
				},
				{
					path: "/products",
					element: <Products />,
				},
                {
					path: "/products/:keyword",
					element: <Products />,
				},
                {
                    path:"/search",
                    element:<Search/>
                }
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
