const mongoose = require("mongoose");

module.exports = (connection) => {
  const collectionSchema = new mongoose.Schema(
    {
      title: { type: String, require: true },
      description: { type: String, require: true },
      collectionType: { type: String, require: true, default: "automated" },
      startDate: { type: String, require: true },
      endDate: { type: String, require: true },
      pageTitle: { type: String },
      metaDescription: { type: String },
      urlHandler: { type: String },
      collectionMedia: { type: mongoose.Schema.Types.ObjectId, ref: "media" },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("collection", collectionSchema, "collection");
};
