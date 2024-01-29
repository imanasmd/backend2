const express = require("express");
const router = express.Router();
const categoryApi = require("../../api/category");
const { validate } = require("../../middlewares");
const passport = require("passport");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.get("/getAll-category", passport.authenticate(["jwt"], { session: false }), categoryApi.getAllCategory.handler);
router.get("/get-category-by-id/:id", passport.authenticate(["jwt"], { session: false }), categoryApi.getCategoryById.handler);
router.post("/remove-category", passport.authenticate(["jwt"], { session: false }), categoryApi.removeCategory.handler);
router.post(
  "/add-category",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("categoryMedia"),
  categoryApi.addCategory.handler
);
router.put(
  "/update-category/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("categoryMedia"),
  categoryApi.updateCategory.handler
);

module.exports = exports = router;
