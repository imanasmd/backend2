const express = require("express");
const passport = require("passport");
const themeApi = require("../../api/theme");
const { mediaUploadS3 } = require("../../S3FileUpload");
const router = express.Router();

router.post("/add-theme-detail", passport.authenticate(["jwt"], { session: false }), mediaUploadS3.single("image"), themeApi.addThemeDetail.handler);
router.post("/add-theme-file", passport.authenticate(["jwt"], { session: false }), themeApi.addThemeFile.handler);
router.get("/getAll-theme", passport.authenticate(["jwt"], { session: false }), themeApi.getAllTheme.handler);
module.exports = exports = router;
