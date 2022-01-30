const mongoose = require("mongoose");

const hostelOwnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const hostelOwner = mongoose.model("hostelOwners", hostelOwnerSchema);

module.exports = hostelOwner;
