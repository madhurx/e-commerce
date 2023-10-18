import React from "react";

const Loader = () => {
	const loading_div = "w-[10vmax] h-[10vmax] border-b-[5px] border-red-950 rounded-[50%]";

	return (
		<div className="loading w-[100vw] h-[100vh] bg-white grid place-items-center max-w-[100%]">
			<div className={` ${loading_div} Loader_loading_div`}></div>
		</div>
	);
};

export default Loader;
