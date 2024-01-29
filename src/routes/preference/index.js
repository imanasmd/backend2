const express = require("express");
const passport = require("passport");
const router = express.Router();
const preferenceApi = require("../../api/preference");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.post("/add-preference", passport.authenticate(["jwt"], { session: false }), preferenceApi.addPreference.handler);
router.put("/update-preference/:id", passport.authenticate(["jwt"], { session: false }), preferenceApi.updatePreference.handler);
router.get("/get-preference", passport.authenticate(["jwt"], { session: false }), preferenceApi.getPreference.handler);
router.put("/update-socialLink/:id", passport.authenticate(["jwt"], { session: false }), preferenceApi.updateSocialLink.handler);
router.put(
  "/update-socialSharing/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("mediaId"),
  preferenceApi.updateSocialSharing.handler
);
router.post(
  "/add-socialSharing/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.array("mediaId"),
  preferenceApi.addSocialSharing.handler
);
router.put(
  "/update-footer/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.single("mediaId"),
  preferenceApi.updateFooter.handler
);
router.post(
  "/update-preference-logo/:id",
  passport.authenticate(["jwt"], { session: false }),
  mediaUploadS3.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "mobileLogo",
      maxCount: 1,
    },
    {
      name: "favicon",
      maxCount: 1,
    },
  ]),
  preferenceApi.updatePreferenceLogo.handler
);

module.exports = exports = router;
