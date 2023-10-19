import React, { useEffect } from "react";
import Carousal from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../utils/actions/productAction";

const ProductDetails = ({match}) => {
    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(state =>state.productDetail);
    console.log(match)

    useEffect(() =>{
        dispatch(getProductDetail(match.params.id))
    }, [dispatch, match.params.id])    

	return (
		<div>
			<div className="productDetails">
				<Carousal>
					{product.images &&
						product.images.map((item, i) => (
							<img className="carousalImage" key={item.url} alt={`${i} Slide`} />
						))}
				</Carousal>
			</div>
		</div>
	);
};

export default ProductDetails;
