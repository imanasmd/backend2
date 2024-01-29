const getAllCustomer = require("./getAll-customer");
const addCustomer = require("./add-customer");
const updateCustomer = require("./update-customer");
const removeCustomer = require("./remove-customer");
const addOrderTimeline = require("./add-customer-timeline");
const updateOrderTimeline = require("./update-customer-timeline");
const getCustomerById = require("./get-customer-by-id");
const addCustomerAddress = require("./add-customer-address");
const updateCustomerAddress = require("./update-customer-address");



module.exports = exports = {
  getAllCustomer,
  addCustomer,
  updateCustomer,
  removeCustomer,
  addOrderTimeline,
  updateOrderTimeline,
  getCustomerById,
  addCustomerAddress,
  updateCustomerAddress
};
