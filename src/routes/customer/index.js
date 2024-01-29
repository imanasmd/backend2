const express = require("express");
const customerApi = require("../../api/customer");
const router = express.Router();
const passport = require("passport");

router.get("/getAll-customer", passport.authenticate(["jwt"], { session: false }), customerApi.getAllCustomer.handler);
router.post("/add-customer", passport.authenticate(["jwt"], { session: false }), customerApi.addCustomer.handler);
router.put("/update-customer/:id", passport.authenticate(["jwt"], { session: false }), customerApi.updateCustomer.handler);
router.put("/add-customer-timeline/:id", passport.authenticate(["jwt"], { session: false }), customerApi.addOrderTimeline.handler);
router.put("/update-customer-timeline/:id", passport.authenticate(["jwt"], { session: false }), customerApi.updateOrderTimeline.handler);
router.put("/add-customer-address/:id", passport.authenticate(["jwt"], { session: false }), customerApi.addCustomerAddress.handler);
router.put("/update-customer-address/:id", passport.authenticate(["jwt"], { session: false }), customerApi.updateCustomerAddress.handler);
router.get("/get-customer-by-id/:id", passport.authenticate(["jwt"], { session: false }), customerApi.getCustomerById.handler);
router.delete("/remove-customer/:id", passport.authenticate(["jwt"], { session: false }), customerApi.removeCustomer.handler);

module.exports = exports = router;
