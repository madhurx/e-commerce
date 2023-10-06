import React from 'react'

const Header = () => {
	const Links = [
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
	return (
		<div className="bg-slate-800 text-white shadow-lg fixed top-0 left-0 w-full">
			<div className="flex md:px:10 px-7 py-4 justify-between items-center">
				<div className=" mx-3 my-2">Hello</div>

				<div class="md:w-1/3 w-3/6 mx-1">
					{/* <button
						type="button"
						data-collapse-toggle="navbar-search"
						aria-controls="navbar-search"
						aria-expanded="false"
						class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
						<svg
							class="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
						<span class="sr-only">Search</span>
					</button> */}
                    
					<div class="relative md:block w-">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								class="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
							<span class="sr-only">Search icon</span>
						</div>
						<input
							type="text"
							id="search-navbar"
							class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600  dark:hover:bg-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search..."
						/>
					</div>
					{/* <button
						data-collapse-toggle="navbar-search"
						type="button"
						class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:bg-gray-600 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
						aria-controls="navbar-search"
						aria-expanded="false">
						<span class="sr-only">Open main menu</span>
						<svg
							class="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button> */}
				</div>

				<div className="">PFP</div>
			</div>
			<div className="px-10 text-gray-500">
				<hr className=" border border-gray-600 rounded opacity-60"/>
			</div>

			<div className="md:flex md:px-10 px-7 py-4 items-center justify-between">
				<div className="flex items-center font-[Poppins]">
					<ul className="md:flex md:items-center  w-full md:w-auto md:pl-0 pl-9 absolute md:static pb-12 md:pb-0 md:z-auto z-[-1] left-0  md:opacity-100 opacity-0 ">
						{Links.map((link, index) => {
							return (
								<li
									key={index}
									className="md: ml-8 text-xl md:my-0 my-7  bg-gray-950 px-3 py-1 hover:bg-zinc-600 rounded-md duration-500">
									<a href={link.url} key={index} className="text-white duration-500">
										{link.text}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);

}

export default Header