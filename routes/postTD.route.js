const express = require("express");
const path = require("path");

const PostTDModel = require("../models/PostTDModel");
const authMiddleware = require("../middlewares/auth.middleware");
const { checkEmployer } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, checkEmployer, (req, res) => {
  const duongdan = path.join(__dirname, "../views/postTD.html");
  res.sendFile(duongdan);
});

router.post("/", authMiddleware, checkEmployer, async (req, res) => {
  const {
    nameCompany,
    job,
    codeCity,
    dateStart,
    dateEnd,
    salary,
    Workingform,
    experience,
    jobdescription,
    interest,
    request,
    formsubmit,
  } = req.body;

  try {
    const newPostCV = {
      user: req.userId,
      nameCompany,
      job,
      codeCity,
      dateStart,
      dateEnd,
      salary,
      Workingform,
      experience,
      jobdescription,
      interest,
      request,
      formsubmit,
    };
    await new PostTDModel(newPostCV).save();
    // const postCreated = await PostCVModel.findById(post._id).populate("user");
    return res.redirect("/postTD");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.delete("/:id", authMiddleware, checkEmployer, async (req, res) => {
  try {
    const { id } = req.params;

    const { userId, user } = req;

    const post = await PostTDModel.findById(id);

    if (!post) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    if (post.user !== userId) {
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
