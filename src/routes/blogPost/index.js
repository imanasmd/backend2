const express = require("express");
const passport = require("passport");
const router = express.Router();
const blogPostApi = require("../../api/blogPost");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.post("/add-blogPost", passport.authenticate(["jwt"], { session: false }), blogPostApi.addBlogPost.handler);
router.put("/update-blogPost/:id", passport.authenticate(["jwt"], { session: false }), blogPostApi.updateBlogPost.handler);
router.get("/getAll-blogPost", passport.authenticate(["jwt"], { session: false }), blogPostApi.getAllBlogPost.handler);
router.get("/get-blogPost-by-id/:id", passport.authenticate(["jwt"], { session: false }), blogPostApi.getBlogPostById.handler);
router.put("/update-blogPost-status", passport.authenticate(["jwt"], { session: false }), blogPostApi.updateBlogPostStatus.handler);
router.post("/remove-blogPost", passport.authenticate(["jwt"], { session: false }), blogPostApi.removeBlogPost.handler);
router.post(
  "/add-blogPost-media/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("blogPostMedia"),
  blogPostApi.addBlogPostMedia.handler
);
router.post(
  "/update-blogPost-media/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("blogPostMedia"),
  blogPostApi.updateBlogPostMedia.handler
);

module.exports = exports = router;
