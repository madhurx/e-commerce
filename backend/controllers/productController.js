const Product = require("../models/productModel");

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
    return res.status(500).json({
      success: false,
      msg: "Product not found",
    });
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

module.exports = { getAllProducts, createProduct, updateProduct };
