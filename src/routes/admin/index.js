const express = require("express");
const router = express.Router();
const adminApi = require("../../api/admin");
const { validate } = require("../../middlewares");
const passport = require("passport");

router.post("/signup-admin", adminApi.adminSignup.handler);
router.put("/signup-domain", passport.authenticate(["jwt"], { session: false }), adminApi.updateSignupDomain.handler);
router.put("/signup-businessDetail", passport.authenticate(["jwt"], { session: false }), adminApi.updateSignupBusinessDetail.handler);
router.put("/signup-subscription", passport.authenticate(["jwt"], { session: false }), adminApi.updateSignupSubscription.handler);
router.get("/role-identify", passport.authenticate(["jwt"], { session: false }), adminApi.roleIdentify.handler);
router.post("/admin-login", adminApi.adminLogin.handler);
router.post("/reset-password/:id", adminApi.resetPassword.handler, passport.authenticate(["jwt"], { session: false }));
router.post("/verify-email", adminApi.verifyEmail.handler);
router.post("/forgot-password/:id", adminApi.forgotPassword.handler);
router.post("/verify-code", adminApi.verifyCode.handler);

module.exports = exports = router;
