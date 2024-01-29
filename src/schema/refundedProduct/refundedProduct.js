const mongoose = require("mongoose");

module.exports = (connection) => {
  const refundedProductSchema = new mongoose.Schema(
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", require: true },
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", require: true },
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer", require: true },
      quantity: { type: Number, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("refunded-product", refundedProductSchema, "refunded-product");
};
