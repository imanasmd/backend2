const mongoose = require("mongoose");

module.exports = (connection) => {
  const giftcardSchema = new mongoose.Schema(
    {
      code: { type: String, require: true },
      initialValue: { type: Number, require: true },
      remainingValue: { type: Number, require: true },
      isActive: { type: Boolean, require: true, default: true },
      isExpire: { type: Boolean, require: true, default: false },
      isDateExpire: { type: Boolean, require: true, default: false },
      expireDate: { type: String, require: true, default: new Date() },
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
      notes: { type: String, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("giftcard", giftcardSchema, "giftcard");
};
