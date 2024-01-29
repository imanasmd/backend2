const { array } = require("joi");
const mongoose = require("mongoose");

module.exports = (connection) => {
  const productSchema = new mongoose.Schema(
    {
      name: { type: String },
      description: { type: String },
      regularPrice: { type: Number },
      salePrice: { type: Number },
      isCharge: { type: Boolean },
      costPerItem: { type: Number },
      sku: { type: String },
      barcode: { type: String },
      isTrackQuantity: { type: Boolean },
      isContinueSelling: { type: Boolean, default: false },
      isPhysical: { type: Boolean, default: false },
      weight: { type: Number },
      unit: { type: String },
      isVariant: { type: Boolean },
      variant: { type: Array },
      totalQty: { type: Number },
      pageTitle: { type: String },
      metaDescription: { type: String },
      urlHandler: { type: String },
      isActive: { type: Boolean, default: false },
      isArchived: { type: Boolean, default: false },
      isDraft: { type: Boolean, default: false },
      isFavorite: { type: Boolean, default: false },
      brand: { type: String },
      mediaId: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
      categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
      quantity: { type: Number },
      tagId: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("product", productSchema, "product");
};
