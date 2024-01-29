const express = require("express");
const supplierApi = require("../../api/supplier");
const { validate } = require("../../middlewares");
const router = express.Router();
const passport = require("passport");

router.get("/getAll-supplier", passport.authenticate(["jwt"], { session: false }), supplierApi.getAllSupplier.handler);
router.post("/add-supplier", passport.authenticate(["jwt"], { session: false }), supplierApi.addSupplier.handler);
router.put("/update-supplier/:id", passport.authenticate(["jwt"], { session: false }), supplierApi.updateSupplier.handler);
router.get("/get-supplier-by-id/:id", passport.authenticate(["jwt"], { session: false }), supplierApi.getSupplierById.handler);
router.put("/remove-supplier", supplierApi.removeSupplier.handler);

module.exports = exports = router;
