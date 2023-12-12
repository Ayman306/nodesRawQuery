const express = require("express");
const route = express.Router();
const {
	getAll,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/productController");
route.route("/").get(getAll).post(createProduct);
route
	.route("/:id")
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct);
module.exports = route;
