const getAllOrder = require("./getAll-order");
const addOrder = require("./add-order");
const updateOrderProduct = require("./update-order-product");
const updateOrderStatus = require("./update-order-status");
const addOrderTimeline = require("./add-order-timeline");
const getOrderById = require("./get-order-by-id");
const refundProduct = require("./refund-product-from-order");
const updateOrderTimeline = require("./update-order-timeline");
const updateOrderCustomer = require("./update-order-customer");
const orderFilter = require("../order-filter/order-filter-date");

module.exports = exports = {
  getAllOrder,
  addOrder,
  updateOrderProduct,
  updateOrderStatus,
  addOrderTimeline,
  updateOrderTimeline,
  updateOrderCustomer,
  getOrderById,
  refundProduct,
  orderFilter,
};
