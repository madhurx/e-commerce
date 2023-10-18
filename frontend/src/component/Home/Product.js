import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(64,89,99,1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 10 : 15,
    };

	return (
		<Link
			className="productCard  w-[14vmax] flex flex-col no-underline text-gray-600 m-[2vmax] transition-all duration-500 pb-[0.5vmax] hover:shadow-[5px 5px 3px rgba(175, 175, 180, 0.76)] hover:shadow hover:translate-y-[-1vmax] "
			to={product._id}
			key={product.index}>
			<img
				src={product.images[0].url}
				alt={product.name}
				className="w-[14vmax] font-[1.2vmax] mx-[0.1vmax] my-[0.5vmax] mb-0 "
			/>
			<p className="font-['Roboto'] mx-[0.5vmax]">{product.name}</p>
			<div className="m-[0.5vmax] flex justify-start ">
				<ReactStars {...options} />{" "}
				<span className=" m-[0.5vmax] font-light font-['Roboto'] font-[0.7vmax]">
					({product.numOfReviews} Review)
				</span>
			</div>
			<span className=" m-[0.5vmax] text-orange-700 font-['Franklin Gothic Medium ', 'Arial Narrow', 'Arial', 'sans-serif'] font-[1vmax]">
				{`₹ ${product.price}`}
			</span>
		</Link>
	);
};

export default Product;
