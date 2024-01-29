const express = require("express");
const passport = require("passport");
const router = express.Router();
const pageApi = require("../../api/page");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.post("/add-page", passport.authenticate(["jwt"], { session: false }), pageApi.addPage.handler);
router.put("/update-page/:id", passport.authenticate(["jwt"], { session: false }), pageApi.updatePage.handler);
router.get("/getAll-page", passport.authenticate(["jwt"], { session: false }), pageApi.getAllPage.handler);
router.get("/get-page-by-id/:id", passport.authenticate(["jwt"], { session: false }), pageApi.getPageById.handler);
router.post("/remove-page", passport.authenticate(["jwt"], { session: false }), pageApi.removePage.handler);
router.put("/update-page-status", passport.authenticate(["jwt"], { session: false }), pageApi.updatePageStatus.handler);
router.post(
  "/add-page-media/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("pageMedia"),
  pageApi.addPageMedia.handler
);
router.post(
  "/update-page-media/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("pageMedia"),
  pageApi.updatePageMedia.handler
);

module.exports = exports = router;
