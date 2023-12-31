import React, { useEffect, useState } from "react";
import Carousal from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../utils/actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../utils/slices/productDetailSlice";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../utils/actions/cartAction";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const params = useParams();
	const { product, loading, error } = useSelector((state) => state.productDetail);

	const options = {
		edit: false,
		color: "rgba(64,89,99,1)",
		activeColor: "tomato",
		value: product.ratings,
		isHalf: true,
		size: window.innerWidth < 600 ? 10 : 15,
	};

	const [quantity, setQuantity] = useState(1);
	const increaseQuantity = () => {
		if (product.stock <= quantity) {
			return;
		}
		const qty = quantity + 1;
		setQuantity(qty);
	};

	const decreaseQuantity = () => {
		if (1 >= quantity) {
			return;
		}
		const qty = quantity - 1;
		setQuantity(qty);
	};

	const addToCartHandler = () => {
        const idAndQuantity = {id : params.id, quantity}
		dispatch(addItemsToCart(idAndQuantity));
		alert.success("Item added to cart");
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}
		dispatch(getProductDetail(params.id));
	}, [dispatch, params.id, alert, error]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<div>
					<MetaData title={`${product.name} - ECOMMERCE`} />
					<div className="ProductDetails ">
						<div>
							<Carousal>
								{product.images &&
									product.images.map((item, i) => (
										<img
											className="CarouselImage"
											key={item.url}
											alt={`${i} Slide`}
											src={item.url}
										/>
									))}
							</Carousal>
						</div>
						<div>
							<div className="detailsBlock-1">
								<h2 className="">{product.name}</h2>
								<p className="">Product # {product.id}</p>
							</div>
							<div className="detailsBlock-2 ">
								<ReactStars {...options} />
								<span className="">({product.numOfReviews} Reviews)</span>
							</div>
							<div className="detailsBlock-3 ">
								<h1 className="">{`₹ ${product.price}`}</h1>

								<div className="detailsBlock-3-1">
									<div className="detailsBlock-3-1-1">
										<button onClick={decreaseQuantity}>-</button>
										<input
											readOnly
											type="number"
											className=""
											placeholder="2"
											value={quantity}
										/>
										<button onClick={increaseQuantity}>+</button>
									</div>
									<button onClick={addToCartHandler}>Add to Cart</button>
								</div>
								<p>
									Status:
									<b className={product.Stock < 1 ? "redColor" : "greenColor"}>
										{product.Stock < 1 ? "OutOfStock" : "InStock"}
									</b>
								</p>
							</div>

							<div className="detailsBlock-4">
								Description :{" "}
								<p className="text-opacity-60 font-light text-sm font-sans">
									{product.description}
								</p>
							</div>
							<button className="submitReview">Submit Review</button>
						</div>
					</div>

					<h3 className="reviewsHeading">REVIEWS</h3>
					{product.reviews && product.reviews[0] ? (
						<div className="reviews">
							{product.reviews &&
								product.reviews.map((review) => (
									<ReviewCard key={review._id} review={review} />
								))}
						</div>
					) : (
						<p className="noReviews">No Reviews Yet</p>
					)}
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
