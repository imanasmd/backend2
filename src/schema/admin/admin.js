const mongoose = require("mongoose");

module.exports = (connection) => {
  const adminSchema = new mongoose.Schema(
    {
      firstName: { type: String, require: true },
      lastName: { type: String, require: true },
      email: { type: String, require: true },
      number: { type: String, require: true },
      password: { type: String, require: true },
      isTandC: { type: Boolean, require: true },
      role: { type: String, require: true },
      businessDetail: {
        category: { type: String, require: true },
        cusSupportNumber: { type: String, require: true },
        cusSupportEmail: { type: String, require: true },
        address: { type: String, require: true },
        city: { type: String, require: true },
        state: { type: String, require: true },
        zipcode: { type: String, require: true },
      },
      domain: {
        isFreeStore: { type: Boolean, require: true },
        domainName: { type: String, require: true },
        storeName: { type: String, require: true },
      },
      subscription: {
        plan: { type: String, require: true },
        details: {
          price: { type: Number, require: true },
          features: [{ type: String, require: true }],
        },
      },
      status: { type: Number, require: true, default: 0 },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model("admin", adminSchema, "admin");
};
