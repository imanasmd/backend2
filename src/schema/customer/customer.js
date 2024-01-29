const mongoose = require('mongoose');

module.exports = (connection) => {
  const customerSchema = new mongoose.Schema(
    {
      firstName: { type: String, require: true },
      lastName: { type: String, require: true },
      number: { type: String, require: true },
      whatsappNumber: { type: String, require: true },
      address: { type: String, require: true },
      apartment: { type: String, require: true },
      email: { type: String, require: true },
      city: { type: String, require: true },
      pincode: { type: Number, require: true },
      marketingEmail: { type: Boolean, require: true, default: false },
      marketingSMS: { type: Boolean, require: true, default: false },
      country: { type: String, require: true, default: 'Pakistan' },
      timeline: [
        {
          message: {
            type: String,
            default: 'You created this customer.',
          },
          date: { type: Date, default: Date.now() },
          isChecked: { type: Boolean, default: false },
        },
      ],
      aid: { type: String, require: true },
    },

    {
      autoCreate: true,
      timestamps: true,
    }
  );
  return connection.model('customer', customerSchema, 'customer');
};
