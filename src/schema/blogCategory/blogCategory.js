const mongoose = require("mongoose");

module.exports = (connection) => {
  const blogCategorySchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      slug: { type: String, require: true },
      parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "blog-category" },
      description: { type: String, require: true },
      mediaId: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("blog-category", blogCategorySchema, "blog-category");
};
