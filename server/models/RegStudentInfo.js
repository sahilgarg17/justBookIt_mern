const mongoose = require("mongoose");

const regStudentInfoSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  hostelOwner: {
    type: String,
    required: true,
  },

  hostelId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },

  workPlace: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const studentRegInfo = mongoose.model("RegStudentInfo", regStudentInfoSchema);

module.exports = studentRegInfo;
