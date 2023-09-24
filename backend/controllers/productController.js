const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const apiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

//createProduct ADMIN
const createProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({ success: "true", product });
});

//get All Products
const getAllProducts = catchAsyncError(async (req, res) => {
	const resultPerPage = 3;
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

	await product.deleteOne();
	res.status(200).json({
		success: true,
		msg: product,
	});
});

module.exports = {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
};
