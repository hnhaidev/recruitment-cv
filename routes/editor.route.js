const express = require("express");
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const FormCVModel = require("../models/FormCV");
const router = express.Router();

router.get("/", (req, res) => {
  const duongdan = path.join(__dirname, "../views/editor.html");
  res.sendFile(duongdan);
});

router.post("/", authMiddleware, async (req, res) => {
  const { img, path, type } = req.body;
  try {
    const newFormCV = { img, path };
    if (type) newFormCV.type = type;

    let dt = await new FormCVModel(newFormCV).save();

    return res.status(200).json(dt);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const formcv = await FormCVModel.findById(id);

    if (!formcv) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    await formcv.remove();
    return res.status(200).send("Đã xóa bài viết thành công !");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.get("/formcv", async (req, res) => {
  try {
    const formcvs = await FormCVModel.find();

    return res.status(200).json(formcvs);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.get("/1", authMiddleware, (req, res) => {
  const cv1 = path.join(__dirname, "../views/list-cv/1.html");
  res.sendFile(cv1);
});
router.get("/2", authMiddleware, (req, res) => {
  const cv2 = path.join(__dirname, "../views/list-cv/2.html");
  res.sendFile(cv2);
});
router.get("/3", authMiddleware, (req, res) => {
  const cv3 = path.join(__dirname, "../views/list-cv/3.html");
  res.sendFile(cv3);
});
router.get("/4", authMiddleware, (req, res) => {
  const cv4 = path.join(__dirname, "../views/list-cv/4.html");
  res.sendFile(cv4);
});
router.get("/5", authMiddleware, (req, res) => {
  const cv5 = path.join(__dirname, "../views/list-cv/5.html");
  res.sendFile(cv5);
});

module.exports = router;
