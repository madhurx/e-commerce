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
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./utils/store";
import { loadUser } from "./utils/actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";

function App() {
	const { userDetail, isAuthenticated } = useSelector((state) => state.user);

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
		store.dispatch(loadUser());
	}, []);

	const AppLayout = () => {
		return (
			<div className="flex flex-col">
				{isAuthenticated && <UserOptions user={userDetail} />}
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
					path: "/search",
					element: <Search />,
				},
				{
					path: "/login",
					element: <LoginSignUp />,
				},
				{
					path: "/account",
					element: <ProtectedRoute path="/account" component={Profile} />,
				},
				{
					path: "/me/update",
					element: <ProtectedRoute path="/me/update" component={UpdateProfile} />,
				},
				{
					path: "/password/update",
					element: <ProtectedRoute path="/password/update" component={UpdatePassword} />,
				},
				{
					path: "/password/forgot",
					element: <ForgotPassword />,
				},
				{
					path: "/password/reset/:token",
					element: <ResetPassword />,
				},
				{
					path: "/cart",
					element: <Cart />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
