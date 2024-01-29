const express = require("express");
const passport = require("passport");
const router = express.Router();
const menuApi = require("../../api/menu");

router.post("/add-menu", passport.authenticate(["jwt"], { session: false }), menuApi.addMenu.handler);
router.get("/getAll-menu", passport.authenticate(["jwt"], { session: false }), menuApi.getAllMenu.handler);
router.get("/get-menu-by-id/:id", passport.authenticate(["jwt"], { session: false }), menuApi.getMenuById.handler);

module.exports = exports = router;
