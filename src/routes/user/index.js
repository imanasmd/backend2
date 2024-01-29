const express = require("express");
const router = express.Router();
const { validate } = require("../../middlewares");
const userApi = require("../../api/user");

router.post("/add-user", validate("body", userApi.addUser.validation), userApi.addUser.handler);

module.exports = exports = router;
