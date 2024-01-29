const mongoose = require("mongoose");

module.exports = (connection) => {
  const discountSchema = new mongoose.Schema(
    {
      type: { type: String, require: true },
      code: { type: String, require: true },
      isPercentage: { type: Boolean, require: true, default: false },
      isFixedAmount: { type: Boolean, require: true, default: false },
      value: { type: Number, require: true },
      isMinRequirement: { type: Boolean, require: true, default: false },
      isMinAmount: { type: Boolean, require: true, default: false },
      minAmount: { type: Number, require: true },
      isMinQty: { type: Boolean, require: true, default: false },
      minQty: { type: Number, require: true },
      isCollection: { type: Boolean, require: true, default: false },
      collectionId: [{ type: mongoose.Schema.Types.ObjectId, ref: "collection" }],
      productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
      isAllCustomer: { type: Boolean, require: true, default: false },
      customerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "customer" }],
      isTotalNumberOfTime: { type: Boolean, require: true, default: false },
      totalNumberOfTime: { type: Number, require: true },
      isOneUsedPerCustomer: { type: Boolean, require: true, default: false },
      oneUsedPerCustomer: { type: Number, require: true },
      startDate: { type: String, require: true },
      startTime: { type: String, require: true },
      isEndDate: { type: Boolean, require: true, default: false },
      endDate: { type: String, require: true },
      isBuysMinQty: { type: Boolean, require: true, default: false },
      buysMinQty: { type: Number, require: true },
      isBuysMinAmount: { type: Boolean, require: true, default: false },
      buysMinAmount: { type: Number, require: true },
      getsQty: { type: Number, require: true },
      isGetsFree: { type: Boolean, require: true, default: false },
      getsPercentage: { type: Number, require: true },
      isGetsMaxPerOrder: { type: Boolean, require: true, default: false },
      getsMaxPerOrder: { type: Number, require: true },
      isFreeShipping: { type: Boolean, require: true, default: false },
      freeShipping: { type: Number, require: true },
      aid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("discount", discountSchema, "discount");
};
