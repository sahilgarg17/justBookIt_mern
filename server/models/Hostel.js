const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  hostelOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HostelOwner",
  },
  hostelName: {
    type: String,
    required: true,
  },
  hostelAddress: {
    type: String,
    required: true,
  },
  hostelPhone: {
    type: String,
    required: true,
  },
  hostelCity: {
    type: String,
    required: true,
  },
  hostelNoOfRooms: {
    type: String,
    required: true,
  },

  studentAssigned: {
    type: Array,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const hostel = mongoose.model("hostels", hostelSchema);

module.exports = hostel;
