const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const apiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

//createProduct ADMIN
const createProduct = catchAsyncError(async (req, res, next) => {
	req.body.user = req.user.id;
	const product = await Product.create(req.body);
	res.status(201).json({ success: "true", product });
});

//get All Products
const getAllProducts = catchAsyncError(async (req, res, next) => {
	const resultPerPage = 5;
	const productCount = await Product.countDocuments();
	const apiFeature = new apiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);

	const products = await apiFeature.query;
	res.status(200).json({ success: true, products, productCount });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
		product,
	});
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	await product.deleteOne();
	res.status(200).json({
		success: true,
		msg: "Prd deleted successfully",
	});
});

// get product details
const getProductDetails = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json({
		success: true,
		msg: product,
	});
});

//review
const createProductReview = catchAsyncError(async (req, res, next) => {
	const { rating, productId, comment } = req.body;
	const review = {
		rating: Number(rating),
		comment,
		user: req.user.id,
		name: req.user.name,
	};

	const product = await Product.findById(productId);
	const isReviewed = product.reviews.find(
		(review) => review.user.toString() === req.user._id.toString(),
	);

	if (isReviewed) {
		product.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.rating = Number(rating);
				review.comment = comment;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	var avg = 0;

	product.reviews.forEach((rev) => {
		avg += rev.rating;
	});

	product.ratings = avg / product.reviews.length;

	await product.save({
		validateBeforeSave: false,
	});

	res.status(200).json({
		success: true,
	});
});

//get all reviews
const getProductReviews = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

const deleteReview = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	const reviews = product.reviews.filter(
		(review) => review._id.toString() !== req.query.id.toString(),
	);

	var avg = 0;
	reviews.forEach((rev) => {
		avg += rev.rating;
	});
	const ratings = avg / reviews.length;

	const numOfReviews = reviews.length;
	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		},
	);

	res.status(200).json({
		success: true,
	});
});

module.exports = {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
};
