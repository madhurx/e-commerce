import React from "react";
import MouseTwoToneIcon from "@mui/icons-material/MouseTwoTone";

const Home = () => {
	return (
		<>
			<div className="banner bg-gradient-to-r from-cyan-500 to-blue-500 h-[100vmin] flex flex-col text-center items-center justify-center text-white md:mt-[142px] mt-[92px]">
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
		</>
	);
};

export default Home;
