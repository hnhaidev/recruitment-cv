const express = require("express");
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const PostCVModel = require("../models/PostCVModel");
const PostTDModel = require("../models/PostTDModel");
const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  const duongdan = path.join(__dirname, "../views/my-documents.html");
  res.sendFile(duongdan);
});

router.get("/my", authMiddleware, async (req, res) => {
  const { role, _id } = req.user;

  try {
    if (role === "user") {
      var cv = await PostCVModel.find({ user: _id });
      return res.status(200).json(cv);
    } else if (role === "employer") {
      var cv1 = await PostTDModel.find({ user: _id });
      return res.status(200).json(cv1);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
