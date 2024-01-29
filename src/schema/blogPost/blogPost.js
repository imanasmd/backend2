const mongoose = require("mongoose");

module.exports = (connection) => {
  const blogPostSchema = new mongoose.Schema(
    {
      title: { type: String, require: true },
      description: { type: String, require: true },
      author: { type: String, require: true },
      mediaId: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
      tagId: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
      blogCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "blog-category" }],
      pageTitle: { type: String },
      metaDescription: { type: String },
      urlHandler: { type: String },
      blogPostMediaURL: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
      isCommentDisable: { type: Boolean, default: false },
      isCommentPending: { type: Boolean, default: false },
      isCommentAutoPublish: { type: Boolean, default: false },
      isActive: { type: Boolean, default: false },
      isArchived: { type: Boolean, default: false },
      isDraft: { type: Boolean, default: false },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("blog-post", blogPostSchema, "blog-post");
};
