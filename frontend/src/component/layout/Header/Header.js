import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

const Header = () => {
	const Links = [
		{
			text: "Homree",
			url: "/",
		},
		{
			text: "Products",
			url: "/products",
		},
		{
			text: "Contact",
			url: "/contact",
		},
		{
			text: "About",
			url: "/about",
		},
	];

	const options = {
		burgerColorHover: "#eb4034",
		logo,
		logoWidth: "20vmax",
		navColor1: "white",
		logoHoverSize: "10px",
		logoHoverColor: "#eb4034",
		link1Text: Links[0].text,
		link3Text: Links[1].text,
		link2Text: Links[2].text,
		link4Text: Links[3].text,
		link1Url: Links[0].url,
		link2Url: Links[1].url,
		link3Url: Links[2].url,
		link4Url: Links[3].url,
		link1Size: "1.3vmax",
		link1Color: "rgba(35, 35, 35,0.8)",
		nav1justifyContent: "flex-end",
		nav2justifyContent: "flex-end",
		nav3justifyContent: "flex-start",
		nav4justifyContent: "flex-start",
		link1ColorHover: "#eb4034",
		link1Margin: "1vmax",
		profileIconUrl: "/login",
		profileIconColor: "rgba(35, 35, 35,0.8)",
		searchIconColor: "rgba(35, 35, 35,0.8)",
		cartIconColor: "rgba(35, 35, 35,0.8)",
		profileIconColorHover: "#eb4034",
		searchIconColorHover: "#eb4034",
		cartIconColorHover: "#eb4034",
		cartIconMargin: "1vmax",
	};

	return <ReactNavbar {...options} />;
};

export default Header;
