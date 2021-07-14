const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const UserModel = require("../models/UserModel");
const router = express.Router();

router.get("/", (req, res) => {
  const duongdan = path.join(__dirname, "../views/sinup.html");
  res.sendFile(duongdan);
});

router.post("/", async (req, res) => {
  const { name, email, roleuser, password } = req.body;
  let role;

  if (password.length < 6) {
    return res.status(401).send("Mật khẩu phải ít nhất 6 kí tự");
  }

  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(401).send("Email đã đăng ký tài khoản !!!");
    }

    if (roleuser == 2) {
      role = "employer";
    } else {
      role = "user";
    }

    user = new UserModel({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server`);
  }
});

module.exports = router;
