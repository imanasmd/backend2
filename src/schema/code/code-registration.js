const mongoose = require("mongoose");
module.exports = (connection) => {
  const registrationCodeSchema = new mongoose.Schema(
    {
      email: { type: String, required: true },
      date: { type: Date, required: true },
    },
    {
      autoCreate: true,
    }
  );

  // Export
  return connection.model("code-registration", registrationCodeSchema, "code-registration");
};
