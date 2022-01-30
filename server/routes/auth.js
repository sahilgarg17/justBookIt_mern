const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Student = require("../models/Student");
const hostelOwner = require("../models/Hostelowner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//for Student sign up
router.post(
  "/createstudent",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    try {
      let newUser = await Student.findOne({ email: req.body.email });

      console.log(newUser);
      if (newUser) {
        res.send("this user  is  already exists");
      } else {
        newUser = await Student.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data = {
          user: {
            id: newUser._id,
          },
        };
        const authToken = jwt.sign(data, process.env.SECRET_KEY);
        console.log(authToken);

        let success;

        if (!newUser) {
          success = false;

          alert("some thing went wrong");
        } else {
          success = true;
          res.json({ newUser, authToken, success });
        }
      }
    } catch (error) {
      res.status(500).send("some thing went wrong");
    }
  }
);

router.post(
  "/createhostelowner",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    try {
      let newUser = await hostelOwner.findOne({ email: req.body.email });
      let success;

      if (newUser) {
        success = false;
        res.json({ success });
      } else {
        newUser = await hostelOwner.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data = {
          user: {
            id: newUser._id,
          },
        };
        const authToken = jwt.sign(data, process.env.SECRET_KEY);
        console.log(authToken);

        if (!newUser) {
          success = false;

          alert("some thing went wrong");
        } else {
          success = true;
          res.json({ newUser, authToken, success });
        }
      }
    } catch (error) {
      res.status(500).send("some thing went wrong");
    }
  }
);

// for student login

router.post(
  "/studentlogin",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blanked").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Student.findOne({ email });

      console.log(user);
      if (!user) {
        res.status(400).json({ error: "Invalid Credentials 1" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      console.log(passwordCompare);
      console.log("after password compare");
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid Credentials 2" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, process.env.SECRET_KEY);
      let success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log("Invalid Credentials");
    }
  }
);

// for hostel Owner login

router.post(
  "/hostelownerlogin",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blanked").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await hostelOwner.findOne({ email });

      console.log(user);
      if (!user) {
        res.status(400).json({ error: "Invalid Credentials 1" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      console.log(passwordCompare);
      console.log("after password compare");
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid Credentials 2" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, process.env.SECRET_KEY);
      let success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log("Invalid Credentials");
    }
  }
);

// get logged in user details

router.get("/getstudent", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await Student.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
router.get("/gethostelowner", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await hostelOwner.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchallstudents", async (req, res) => {
  try {
    const user = await Student.find();
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
