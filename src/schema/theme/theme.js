const mongoose = require("mongoose");

module.exports = (connection) => {
  const themeSchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      description: { type: String, require: true },
      category: { type: String, require: true },
      tag: { type: mongoose.Schema.Types.ObjectId, ref: "tag" },
      image: { type: String, require: true },
      isFeatured: { type: Boolean, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("theme", themeSchema, "theme");
};
