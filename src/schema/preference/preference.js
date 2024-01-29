const mongoose = require("mongoose");

module.exports = (connection) => {
  const preferenceSchema = new mongoose.Schema(
    {
      title: { type: String, require: true },
      metaDescription: { type: String, require: true },
      logo: {
        logo: { type: mongoose.Schema.Types.ObjectId, ref: "media" },
        mobileLogo: { type: mongoose.Schema.Types.ObjectId, ref: "media" },
        favicon: { type: mongoose.Schema.Types.ObjectId, ref: "media" },
      },
      socialSharing: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
      color: { primaryColour: { type: String, require: true }, secondaryColour: { type: String, require: true } },
      googleAnalyticsCode: { type: String },
      rechaptcha: { rechaptchaOnComment: { type: String, require: true }, rechaptchaOnLogin: { type: String, require: true } },
      siteLayout: { type: String, require: true },
      socialLink: [
        {
          name: { type: String, require: true },
          link: { type: String, require: true },
        },
      ],
      productSearch: {
        isDisplaySearch: { type: Boolean, require: true, default: false },
        displaySearch: { type: String, require: true },
        isDisplaySearchMobile: { type: Boolean, require: true, default: false },
      },
      footer: {
        isScrollTop: { type: Boolean, require: true },
        isMobileSearch: { type: Boolean, require: true },
        searchText: { type: String, require: true },
        copyrightText: { type: String, require: true },
        mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "media" },
      },
      permalink: {
        plain: {
          link: { type: String, require: true },
          checked: { type: Boolean, require: true, default: false },
        },
        dayName: {
          link: { type: String, require: true },
          checked: { type: Boolean, require: true, default: false },
        },
        monthName: {
          link: { type: String, require: true },
          checked: { type: Boolean, require: true, default: false },
        },
        numeric: {
          link: { type: String, require: true },
          checked: { type: Boolean, require: true, default: false },
        },
        postName: {
          link: { type: String, require: true },
          checked: { type: Boolean, require: true, default: false },
        },
      },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("preference", preferenceSchema, "preference");
};
