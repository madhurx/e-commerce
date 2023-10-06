import React, { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "./Button";

const Navbar = () => {
	let Links = [
		{
			text: "Home",
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
		{
			text: "Login",
			url: "/login",
		},
	];
	const [open, setOpen] = useState(false);

	return (
		<div className="w-full shadow-lg fixed top-0 left-0">
			<div className="md:flex bg-white py-4 md:px-10 px-7 items-center justify-between">
				<div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800 font-[Poppins]">
					<span className="text-3xl text-indigo-500 mr-1">
						<EmojiEmotionsIcon sx={{ fontSize: 40 }} />
					</span>
					Design
				</div>
				<div
					onClick={() => {
						setOpen(!open);
					}}
					className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
					{!open ? (
						<MenuRoundedIcon sx={{ fontSize: 40 }} color="success" />
					) : (
						<CloseRoundedIcon sx={{ fontSize: 40 }} color="secondary" />
					)}
				</div>
				<ul
					className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in md:opacity-100 opacity-0 ${
						open ? "top-20 opacity-100" : "top-[-480px]"
					}`}>
					{Links.map((link, index) => {
						return (
							<li key={index} className="md: ml-8 text-xl md:my-0 my-7 ">
								<a
									href={link.url}
									key={index}
									className="text-gray-900 hover:text-gray-500 duration-500">
									{link.text}
								</a>
							</li>
						);
					})}
					<Button>get start</Button>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
