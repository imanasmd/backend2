const express = require("express");
const router = express.Router();
const collectionApi = require("../../api/collection");
const { validate } = require("../../middlewares");
const passport = require("passport");
const { mediaUploadS3 } = require("../../S3FileUpload");

router.get("/getAll-collection", passport.authenticate(["jwt"], { session: false }), collectionApi.getAllCollection.handler);
router.get("/get-collection-by-id/:id", passport.authenticate(["jwt"], { session: false }), collectionApi.getCollectionById.handler);
router.put("/remove-collection", passport.authenticate(["jwt"], { session: false }), collectionApi.removeCollection.handler);
router.post(
  "/add-collection",
  mediaUploadS3.single("collectionMedia"),
  collectionApi.addCollection.handler,
  passport.authenticate(["jwt"], { session: false })
);

router.put(
  "/update-collection/:id",
  mediaUploadS3.single("collectionMedia"),
  passport.authenticate(["jwt"], { session: false }),
  collectionApi.updateCollection.handler
);

module.exports = exports = router;
