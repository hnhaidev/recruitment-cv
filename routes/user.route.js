const express = require("express");
const UserModel = require("../models/UserModel");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const { user } = req;

  try {
    // const user = await UserModel.findById(userId);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});
module.exports = router;
