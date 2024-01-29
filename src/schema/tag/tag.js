const mongoose = require("mongoose");

module.exports = (connection) => {
  const tagSchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      role: { type: String, require: true },
      description: { type: String, require: true },
      slug: { type: String, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("tag", tagSchema, "tag");
};
