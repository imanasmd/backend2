const mongoose = require("mongoose");

module.exports = (connection) => {
  const pageSchema = new mongoose.Schema(
    {
      title: { type: String, require: true },
      description: { type: String, require: true },
      status: { type: String, require: true },
      mediaId: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
      pageTitle: { type: String },
      metaDescription: { type: String },
      urlHandler: { type: String },
      isActive: { type: Boolean, default: false },
      isArchived: { type: Boolean, default: false },
      isDraft: { type: Boolean, default: false },
      tempelteId: { type: mongoose.Schema.Types.ObjectId, ref: "tempelte" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("page", pageSchema, "page");
};
