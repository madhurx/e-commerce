import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./component/Home/Home";
import { Provider } from "react-redux";
import store from "./utils/store";

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
				<Provider store = {store}>
					<div className="flex flex-col">
						<Header />
						<Home />
						<Footer />
					</div>
				</Provider>
			),
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
