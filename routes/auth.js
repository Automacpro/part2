const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const config = require("config");

const User = require("../models/User");

const auth = require("../middleware/auth");

// @route GET api/users
// @get logged in user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/users
// @ Auth user and get Token
// @access Public
router.post(
  "/",
  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Please Enter Valid Password").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credientials" });
      }

      // Match the password with data base password

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credientials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
