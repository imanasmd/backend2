const mongoose = require("mongoose");

module.exports = (connection) => {
  const supplierSchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      zipcode: { type: String, require: true },
      contactName: { type: String, require: true },
      email: { type: String, require: true },
      number: { type: String, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("supplier", supplierSchema, "supplier");
};
