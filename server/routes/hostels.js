const express = require("express");
const hostel = require("../models/Hostel");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const studentRegInfo = require("../models/RegStudentInfo");
const { hashSync } = require("bcryptjs");

router.post("/addhostel", fetchUser, async (req, res) => {
  const {
    hostelName,
    hostelAddress,
    hostelPhone,
    hostelCity,
    studentAssigned,
    hostelNoOfRooms,
  } = req.body;

  const newHostel = new hostel({
    hostelName,
    hostelAddress,
    hostelPhone,
    hostelCity,
    hostelNoOfRooms,
    studentAssigned,
    hostelOwner: req.user.id,
  });

  const addedHostel = await newHostel.save();

  res.json(addedHostel);
});
//this route is used to fetch hostel for a hostel owner
router.get("/fetchhostel", fetchUser, async (req, res) => {
  const hostelOwnerid = req.user.id;

  const hostels = await hostel.find({ hostelOwner: hostelOwnerid });
  console.log(hostels);
  res.json(hostels);
});

router.get("/fetchhostels", async (req, res) => {
  const hostels = await hostel.find();

  res.json(hostels);
});
router.get("/fetchRegStudentData", async (req, res) => {
  const RegStudents = await studentRegInfo.find();

  console.log("hello world");
  res.json(RegStudents);
});
router.delete("/remRegStudentData/:id", async (req, res) => {
  const id = req.params.id;

  const RegStudent = await studentRegInfo.findByIdAndDelete({ _id: id });

  console.log("hello world");
  console.log(hostelFind);
  res.json({ RegStudent });
});

router.put("/updatehostel/:id", fetchUser, async (req, res) => {
  const hostelId = req.params.id;

  const {
    hostelName,
    hostelAddress,
    hostelPhone,
    hostelCity,
    hostelNoOfRooms,
  } = req.body;

  let newHostel = {};
  if (hostelName) {
    newHostel.hostelName = hostelName;
  }
  if (hostelAddress) {
    newHostel.hostelAddress = hostelAddress;
  }
  if (hostelPhone) {
    newHostel.hostelPhone = hostelPhone;
  }
  if (hostelCity) {
    newHostel.hostelCity = hostelCity;
  }
  if (hostelNoOfRooms) {
    newHostel.hostelNoOfRooms = hostelNoOfRooms;
  }

  let fetchHostel = await hostel.findById(hostelId);

  console.log(fetchHostel);

  if (!fetchHostel) {
    res.send("Hostel not found");
  }

  console.log(req.user);
  if (fetchHostel.hostelOwner.toString() !== req.user.id) {
    res.send("you are not  allowed to update it");
  }

  fetchHostel = await hostel.findByIdAndUpdate(
    hostelId,
    { $set: newHostel },
    { new: true }
  );

  res.send(fetchHostel);
});

router.get("/getassignhostel", fetchUser, async (req, res) => {
  const studentId = req.user.id;

  let fetchHostel = await hostel.find();

  if (!fetchHostel) {
    res.send("Hostel not found");
  }

  console.log(req.user);

  fetchHostel.forEach((doc) => {
    doc.studentAssigned.forEach((item) => {
      if (item === studentId.toString()) {
        res.json(doc);
      }
    });
  });

  res.json({ err: "you have not assigned a hostel yet" });

  // res.json(fetchHostel);

  // if (fetchHostel.hostelOwner.toString() !== req.user.id) {
  //   res.send("you are not  allowed to update it");

  // }

  // const hostelObj = await hostel.findById(hostelId);
  // const hostelAssigned = hostelObj.studentAssigned;
  // console.log(hostelObj);
  // console.log(hostelAssigned);
  // let success = false;
  // hostelAssigned.forEach((item) => {
  //   if (studentId.toString() === item) {
  //     success = true;
  //   }
  // });
  // if (success) {
  //   res.json({ hostelObj, success });
  // }
});

router.put("/assignhostel/:id", fetchUser, async (req, res) => {
  const hostelId = req.params.id;
  const studentId = req.user.id;

  let fetchHostel = await hostel.findById(hostelId);

  console.log(fetchHostel);

  if (!fetchHostel) {
    res.send("Hostel not found");
  }

  console.log(req.user);
  // if (fetchHostel.hostelOwner.toString() !== req.user.id) {
  //   res.send("you are not  allowed to update it");

  // }

  const hostelObj = await hostel.find();

  let success = true;
  hostelObj.forEach((hostelDoc) => {
    const hostelAssigned = hostelDoc.studentAssigned;
    hostelAssigned.forEach((item) => {
      if (studentId.toString() === item) {
        success = false;
        res.json({ result: "you already assigned", success });
      }
    });
  });

  // console.log(hostelObj);
  // console.log(hostelAssigned);

  let hostelAssigned = fetchHostel.studentAssigned;

  console.log(success, "this iss");
  if (success) {
    fetchHostel = await hostel.findByIdAndUpdate(
      hostelId,
      {
        $set: {
          studentAssigned: [...hostelAssigned, studentId],
        },
      },
      { new: true }
    );

    if (fetchHostel) {
      success = true;
      res.json({ success });
    }
  }

  res.json({ err: "some thing went wrong" });
});

router.delete("/deletehostel/:id", fetchUser, async (req, res) => {
  const hostelId = req.params.id;

  console.log(hostelId);

  let delHostel = await hostel.findById(hostelId);

  console.log(delHostel);
  if (!delHostel) {
    res.send("hostel not found");
  }

  // if (delHostel.hostelOwner.toString() !== req.user.id) {
  //   res.send("You are not allowed to  delete this hostel");
  // }

  let del = await hostel.findByIdAndDelete(hostelId);

  res.send(del);
});

router.post("/reg", fetchUser, async (req, res) => {
  const {
    firstName,
    lastName,
    hostelOwner,
    hostelId,
    fatherName,
    cnic,
    dob,
    workPlace,
    phone,
  } = req.body;

  console.log("ello");
  const newRegStudent = new studentRegInfo({
    firstName,
    lastName,
    fatherName,
    hostelOwner,
    hostelId,
    cnic,
    dob,
    workPlace,
    phone,
    studentId: req.user.id,
  });

  const registeredStudentInfo = await newRegStudent.save();

  res.json(registeredStudentInfo);
});

router.get("/searchhostel/:text", async (req, res) => {
  try {
    const searchText = req.params.text;
    const hostels = await hostel.find();

    let resHostelCity = [];
    let resHostelName = [];

    hostels.forEach((item) => {
      const hostelName = item.hostelName;
      if (item.hostelCity === searchText) {
        resHostelCity.push(item);
      } else if (hostelName.includes(searchText)) {
        resHostelName.push(item);
      }
    });

    console.log(resHostelCity.length, resHostelName.length);
    res.json({ resHostelCity, resHostelName });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
