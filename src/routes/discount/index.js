const express = require("express");
const discountApi = require("../../api/discount");
const { validate } = require("../../middlewares");
const router = express.Router();
const passport = require("passport");

router.get("/getAll-discount", discountApi.getAllDiscount.handler);
router.post("/add-discount", passport.authenticate(["jwt"], { session: false }), discountApi.addDiscount.handler);
router.put("/update-discount/:id", passport.authenticate(["jwt"], { session: false }), discountApi.updateDiscount.handler);
router.get("/get-discount-by-id/:id", passport.authenticate(["jwt"], { session: false }), discountApi.getDiscountById.handler);

// router.delete(
//   "/remove-discount/:id",
//   // validate("body", discountApi.removeDiscount.validation),
//   discountApi.removeDiscount.handler
// );

module.exports = exports = router;
