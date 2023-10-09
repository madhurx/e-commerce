import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./component/Home/Home";

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
				<div>
					{/* <Header /> */}
                    <Home/>
					<Footer />
				</div>
			),
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
