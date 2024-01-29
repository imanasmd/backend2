const mongoose = require("mongoose");

module.exports = (connection) => {
  const inventoryTransferSchema = new mongoose.Schema(
    {
      originId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "supplier" },
      destinationId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "supplier" },
      productId: [
        {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
          quantity: { type: Number, require: true },
        },
      ],
      tagId: [{ type: mongoose.Schema.Types.ObjectId, require: true, ref: "tag" }],
      estimatedArrivalDate: { type: String, require: true },
      trackingNumber: { type: String, require: true },
      courierName: { type: String, require: true },
      referenceNumber: { type: String, require: true },
      status: { type: String, require: true, default: "In Transit" },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("inventory-transfer", inventoryTransferSchema, "inventory-transfer");
};
