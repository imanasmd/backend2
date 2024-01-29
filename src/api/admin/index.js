const adminSignup = require("./admin-signup");
const adminLogin = require("./admin-login");
const resetPassword = require("./reset-password");
const verifyEmail = require("./verify-email");
const verifyCode = require("./verify-code");
const updateSignupBusinessDetail = require("./signup-businessDetail");
const updateSignupDomain = require("./signup-domain");
const updateSignupSubscription = require("./signup-subscription");
const forgotPassword = require("./forgot-password");
const roleIdentify = require("./role-identify");

module.exports = exports = {
  adminSignup,
  adminLogin,
  resetPassword,
  verifyEmail,
  verifyCode,
  updateSignupBusinessDetail,
  updateSignupDomain,
  updateSignupSubscription,
  forgotPassword,
  roleIdentify,
};
