const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

//createProduct ADMIN
const createProduct = async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({ success: "true", product });
};

//get All Products
const getAllProducts = async (req, res) => {
	const products = await Product.find();
	res.status(200).json({ products });
};

const updateProduct = async (req, res, next) => {
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
};

const deleteProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	await product.deleteOne();
	res.status(200).json({
		success: true,
		msg: "Prd deleted successfully",
	});
};

// get product details
const getProductDetails = async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	await product.deleteOne();
	res.status(200).json({
		success: true,
		msg: product,
	});
};

module.exports = {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
};
