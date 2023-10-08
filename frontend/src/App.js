import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Navbar2 from "./component/layout/Navbar2";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";

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
    
	return (
		<div>
			<Navbar2/>
			<Header />
            <Footer/>
		</div>
	);
}

export default App;
