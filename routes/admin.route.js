const express = require("express");
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const { checkAdmin } = require("../middlewares/role.middleware");
const PostCVModel = require("../models/PostCVModel");
const PostTDModel = require("../models/PostTDModel");
const UserModel = require("../models/UserModel");
const FormCVModel = require("../models/FormCV");
const router = express.Router();

router.get("/", authMiddleware, checkAdmin, (req, res) => {
  const duongdan = path.join(__dirname, "../views/admin.html");
  res.sendFile(duongdan);
});

router.get("/alluser", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const alluser = await UserModel.find();

    return res.status(200).send(alluser);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.get("/allformcv", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const allformcv = await FormCVModel.find();

    return res.status(200).send(allformcv);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

module.exports = router;
