const express = require("express");
const giftcardApi = require("../../api/giftcard");
const { validate } = require("../../middlewares");
const router = express.Router();
const passport = require("passport");

router.get("/getAll-giftcard", passport.authenticate(["jwt"], { session: false }), giftcardApi.getAllGiftcard.handler);
router.post("/add-giftcard", passport.authenticate(["jwt"], { session: false }), giftcardApi.addGiftcard.handler);
router.put("/update-giftcard/:id", passport.authenticate(["jwt"], { session: false }), giftcardApi.updateGiftcard.handler);
router.get("/get-giftcard-by-id/:id", passport.authenticate(["jwt"], { session: false }), giftcardApi.getGiftcardById.handler);
router.put("/update-giftcard-status", passport.authenticate(["jwt"], { session: false }), giftcardApi.giftcardStatus.handler);

module.exports = exports = router;
