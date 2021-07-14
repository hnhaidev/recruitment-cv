const express = require("express");
const path = require("path");

const authMiddleware = require("../middlewares/auth.middleware");
const PostCVModel = require("../models/PostCVModel");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  const duongdan = path.join(__dirname, "../views/postCV.html");
  res.sendFile(duongdan);
});

router.post("/", authMiddleware, async (req, res) => {
  const {
    name,
    email,
    phone,
    gender,
    dob,
    codeCity,
    experience,
    address,
    job,
    desire,
  } = req.body;

  if (req.files) {
    const upCV = req.files.cv;
    const cvName = upCV.name;

    upCV.mv("./public/uploads/" + cvName, (err) => {
      if (err) {
        console.log(err);
      } else {
      }
    });

    var cv = "/uploads/" + cvName;
  }

  try {
    const newPostCV = {
      user: req.userId,
      cv,
      name,
      email,
      phone,
      gender,
      dob,
      codeCity,
      experience,
      job,
    };
    if (address) newPostCV.address = address;
    if (desire) newPostCV.desire = desire;
    await new PostCVModel(newPostCV).save();
    // const postCreated = await PostCVModel.findById(post._id).populate("user");
    return res.redirect("/postCV");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { userId, user } = req;

    const post = await PostCVModel.findById(id);

    if (!post) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    if (post.user.toString() !== userId) {
      if (user.role === "root") {
        await post.remove();
        return res.status(200).send("Đã xóa bài viết thành công !");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }

    await post.remove();
    return res.status(200).send("Đã xóa bài viết thành công !");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

module.exports = router;
