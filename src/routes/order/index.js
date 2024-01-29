const express = require('express');
const orderApi = require('../../api/order');
const { validate } = require('../../middlewares');
const router = express.Router();
const passport = require('passport');

router.get(
  '/getAll-order',
  passport.authenticate(['jwt'], { session: false }),
  orderApi.getAllOrder.handler
);
router.post(
  '/add-order',
  passport.authenticate(['jwt'], { session: false }),
  orderApi.addOrder.handler
);
router.put('/update-order-status/:id', orderApi.updateOrderStatus.handler);
router.put('/update-order-product/:id', orderApi.updateOrderProduct.handler);
router.put(
  '/add-order-timeline/:id',
  passport.authenticate(['jwt'], { session: false }),
  orderApi.addOrderTimeline.handler
);
router.put('/update-order-timeline/:id', orderApi.updateOrderTimeline.handler);
router.put(
  '/refund-product-from-order/:id',
  passport.authenticate(['jwt'], { session: false }),
  orderApi.refundProduct.handler
);
router.put('/update-order-customer/:id', orderApi.updateOrderCustomer.handler);
router.get('/get-order-by-id/:id', orderApi.getOrderById.handler);
router.post('/order-filter', orderApi.orderFilter.handler);

module.exports = exports = router;
