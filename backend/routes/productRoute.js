const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/product/new", createProduct)
router.put("/product/:id", updateProduct);

module.exports = router;
