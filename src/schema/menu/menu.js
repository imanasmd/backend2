const mongoose = require("mongoose");

module.exports = (connection) => {
  const menuSchema = new mongoose.Schema(
    {
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
      menu: { type: Array, require: true },
      title: { type: String, require: true },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("menu", menuSchema, "menu");
};
