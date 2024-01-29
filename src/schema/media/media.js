const mongoose = require("mongoose");

module.exports = (connection) => {
  const mediaSchema = new mongoose.Schema(
    {
      url: { type: String, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("media", mediaSchema, "media");
};
