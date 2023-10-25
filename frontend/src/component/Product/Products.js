import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../utils/actions/productAction";
import { clearErrors } from "../../utils/slices/allProductsSlice";
import { useAlert } from "react-alert";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
	"Laptop",
	"Footwear",
	"Bottom",
	"Tops",
	"Attire",
	"Camera",
	"SmartPhones",
	"mobile",
];

const Products = () => {
	const params = useParams();
	const keyword = params.keyword;
	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([0, 100000]);
	const [category, setCategory] = useState();
	const [ratings, setRatings] = useState(0);

	const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } =
		useSelector((state) => state.products);
	const dispatch = useDispatch();
	const alert = useAlert();

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};
	const priceHandler = (event, newPrice) => {
		setPrice(newPrice);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}
		const getProductsActionParams = { keyword, currentPage, price, category, ratings };

		dispatch(getProducts(getProductsActionParams));
	}, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

	let count = filteredProductsCount;
	console.log(resultPerPage + "    " + count);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div>
					<MetaData title="PRODUCTS -- ECOMMERCE" />
					<h2 className="productsHeading">Products</h2>

					<div className="products">
						{products &&
							products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>
					{keyword && (
						<div className="filterBox">
							<Typography>Price</Typography>
							<Slider
								value={price}
								onChange={priceHandler}
								valueLabelDisplay="auto"
								aria-labelledby="range-slider"
								min={0}
								max={100000}
							/>

							<Typography>Categories</Typography>
							<ul className="categoryBox">
								{categories.map((category) => (
									<li
										className="category-link"
										key={category}
										onClick={() => setCategory(category)}>
										{category}
									</li>
								))}
							</ul>

							<fieldset>
								<Typography component="legend">Ratings Above</Typography>
								<Slider
									value={ratings}
									onChange={(e, newRating) => {
										setRatings(newRating);
									}}
									aria-labelledby="continuous-slider"
									valueLabelDisplay="auto"
									min={0}
									max={5}
								/>
							</fieldset>
						</div>
					)}

					{resultPerPage < count && resultPerPage < productsCount && (
						<div className="paginationBox">
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resultPerPage}
								totalItemsCount={productsCount}
								onChange={setCurrentPageNo}
								nextPageText="Next"
								prevPageText="Prev"
								firstPageText="1st"
								lastPageText="Last"
								itemClass="page-item"
								linkClass="page-link"
								activeClass="pageItemActive"
								activeLinkClass="pageLinkActive"
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Products;
