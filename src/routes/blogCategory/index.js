const express = require("express");
const passport = require("passport");
const router = express.Router();
const blogCategoryApi = require("../../api/blogCategory");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.get("/getAll-blogCategory", passport.authenticate(["jwt"], { session: false }), blogCategoryApi.getAllBlogCategory.handler);
router.get("/get-blogCategory-by-id/:id", passport.authenticate(["jwt"], { session: false }), blogCategoryApi.getBlogCategoryById.handler);
router.post("/remove-blogCategory", passport.authenticate(["jwt"], { session: false }), blogCategoryApi.removeBlogCategory.handler);
router.post(
  "/add-blogCategory",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("blogCategoryMedia"),
  blogCategoryApi.addBlogCategory.handler
);
router.put(
  "/update-blogCategory/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("blogCategoryMedia"),
  blogCategoryApi.updateBlogCategory.handler
);

module.exports = exports = router;
