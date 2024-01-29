const mongoose = require("mongoose");

module.exports = (connection) => {
  const userSchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      email: { type: String, require: true },
      number: { type: String, require: true },
      password: { type: String, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("user", userSchema, "user");
};
