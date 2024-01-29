const getAllProduct = require("./getAll-product");
const addProduct = require("./add-product");
const addProductMedia = require("./add-product-media");
const updateProductMedia = require("./update-product-media");
const updateProduct = require("./update-product");
const searchProduct = require("./search-product");
const gerProductByCategoryId = require("./get-product-by-Id");
const updateProductStatus = require("./update-product-status");
const updateProductQty = require("./update-product-quantity");
const updateProductFavorite = require("./update-product-favorite");
const removeProduct = require("./remove-product");

module.exports = exports = {
  getAllProduct,
  addProduct,
  addProductMedia,
  updateProductMedia,
  updateProduct,
  searchProduct,
  gerProductByCategoryId,
  updateProductStatus,
  updateProductQty,
  updateProductFavorite,
  removeProduct,
};
