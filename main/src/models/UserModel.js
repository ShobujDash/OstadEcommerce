const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    email: { type: String, required: true,lowercase:true,uniquq:true },
    otp: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("users", DataSchema);

module.exports = UserModel;
