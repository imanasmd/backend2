const mongoose = require("mongoose");

module.exports = (connection) => {
  const orderSchema = new mongoose.Schema(
    {
      productId: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            require: true,
          },
          quantity: { type: Number, require: true, default: 1 },
        },
      ],
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "customer",
      },
      orderIndex: { type: String, require: true },
      resoneForEdit: { type: String, require: true, default: "" },
      resoneForRefund: { type: String, require: true, default: "" },
      isDraft: { type: Boolean, require: true, default: false },
      status: { type: Boolean, require: true, default: false },
      shippingAmount: { type: Number, require: true },
      subtotal: { type: Number, require: true },
      totalAmount: { type: Number, require: true },
      refundPrice: { type: Number, require: true },
      discount: { type: Number, require: true },
      isNotification: { type: Boolean, require: true, default: true },
      paymentMethod: { type: String, require: true },
      refundedProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: "refunded-product" }],
      refundAmount: { type: Number, require: true },
      tagId: [{ type: mongoose.Schema.Types.ObjectId, require: true, ref: "tag" }],
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
      timeline: [
        {
          message: {
            type: String,
            require: true,
            default: "You created this customer.",
          },
          date: { type: Date, default: Date.now() },
          isChecked: { type: Boolean, default: false },
        },
      ],
      notes: { type: String, require: true },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("order", orderSchema, "order");
};
