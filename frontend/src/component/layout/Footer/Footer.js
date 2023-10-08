import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";

const Footer = () => {
	return (
		<div className="mt-[10vmax] p-[2vmax] bg-gray-950 text-white flex text-center">
			<div className="leftFooter w-1/5 flex flex-col items-center">
				<h4 className="font-['Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif ]">
					DOWNLOAD OUR APP
				</h4>
				<p className="text-center font-['Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', Lucida Sans Unicode', Geneva, Verdana, sans-serif]">
					Download App for Android and IOS mobile phone
				</p>
				<img src={playStore} alt="playStore" className="w-[10vmax] m-[1vmax] cursor-pointer" />
				<img src={appStore} alt="appStore" className="w-[10vmax] m-[1vmax] cursor-pointer" />
			</div>

			<div className="midFooter w-3/5 ">
				<h1 className="text-[4vmax] font-['Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif] text-orange-400 ">
					E Commerce
				</h1>
				<p className="max-w-[60%] mx-[1vmax] my-auto mx-auto ">High Quality priority</p>
			</div>

			<div className="rightFooter w-1/5 flex flex-col items-center">
				<h4 className="font-['Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif] text-[1.4vmax] underline">
					Follow us
				</h4>
				<a
					href="https://fb.com"
					className="no-underline text-[1.4vmax] font-['Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif] text-white">
					Facebook
				</a>
				<a href="https://fb.com">Facebook</a>
				<a href="https://fb.com">Facebook</a>
			</div>
		</div>
	);
};

export default Footer;
