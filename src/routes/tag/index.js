const express = require("express");
const tagApi = require("../../api/tag");
const { validate } = require("../../middlewares");
const router = express.Router();
const passport = require("passport");

router.get("/getAll-tag", passport.authenticate(["jwt"], { session: false }), tagApi.getAllTag.handler);
router.post("/add-tag", passport.authenticate(["jwt"], { session: false }), tagApi.addTag.handler);
router.get("/get-tag-by-id/:id", passport.authenticate(["jwt"], { session: false }), tagApi.getTagById.handler);

// router.put(
//   "/update-tag/:id",
//   // validate("body", tagApi.updateProduct.validation),
//   tagApi.updateTag.handler
// );
// router.put(
//   "/remove-tag",
//
//   tagApi.removeTag.handler
// );

module.exports = exports = router;
