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

const Products = () => {
	const params = useParams();
	const keyword = params.keyword;
	const [currentPage, setCurrentPage] = useState(1);

	const { products, loading, error, productsCount, resultPerPage } = useSelector(
		(state) => state.products,
	);
	const dispatch = useDispatch();
	const alert = useAlert();
	const setCurrentPageNo = () => {
		setCurrentPage(2);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		}
        // console.log(currentPage);



		dispatch(getProducts(keyword, currentPage));
	}, [dispatch, error, alert, keyword, currentPage]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div>
					<h2 className="productsHeading">Products</h2>

					<div className="products">
						{products &&
							products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>

					{resultPerPage < productsCount && (
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
