const express = require("express");
const productApi = require("../../api/product");
const router = express.Router();
const passport = require("passport");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.get("/search-product", productApi.searchProduct.handler);
router.put("/update-product-status", passport.authenticate(["jwt"], { session: false }), productApi.updateProductStatus.handler);
router.put("/update-product/:id", passport.authenticate(["jwt"], { session: false }), productApi.updateProduct.handler);
router.put("/update-product-quantity/:id", passport.authenticate(["jwt"], { session: false }), productApi.updateProductQty.handler);
router.put("/update-product-favorite/:id", passport.authenticate(["jwt"], { session: false }), productApi.updateProductFavorite.handler);
router.get("/getAll-product", passport.authenticate(["jwt"], { session: false }), productApi.getAllProduct.handler);
router.post("/add-product", passport.authenticate(["jwt"], { session: false }), productApi.addProduct.handler);
router.get("/get-product-by-id/:id", passport.authenticate(["jwt"], { session: false }), productApi.gerProductByCategoryId.handler);
router.post("/remove-product", passport.authenticate(["jwt"], { session: false }), productApi.removeProduct.handler);
router.post(
  "/add-product-media/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("productMedia"),
  productApi.addProductMedia.handler
);
router.post(
  "/update-product-media/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("productMedia"),
  productApi.updateProductMedia.handler
);

module.exports = exports = router;
