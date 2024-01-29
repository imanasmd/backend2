const express = require("express");
const mediaApi = require("../../api/media");
const { validate } = require("../../middlewares");
const router = express.Router();
const passport = require("passport");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.get("/getAll-media", passport.authenticate(["jwt"], { session: false }), mediaApi.getAllMedia.handler);
router.post("/add-media", passport.authenticate(["jwt"], { session: false }), mediaUploadS3.array("media"), mediaApi.addMedia.handler);
router.put("/remove-media", passport.authenticate(["jwt"], { session: false }), mediaApi.removeMedia.handler);

module.exports = exports = router;
