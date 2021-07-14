const express = require("express");
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const { checkEmployer } = require("../middlewares/role.middleware");
const PostCVModel = require("../models/PostCVModel");

const router = express.Router();

router.get("/", authMiddleware, checkEmployer, (req, res) => {
  const duongdan = path.join(__dirname, "../views/searchCV.html");
  res.sendFile(duongdan);
});

router.get("/listcv", authMiddleware, checkEmployer, async (req, res) => {
  try {
    const listcv = await PostCVModel.find().sort({ createdAt: -1 });

    return res.status(200).json(listcv);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.get("/:id", authMiddleware, checkEmployer, async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await PostCVModel.findById(id);

    return res.status(200).json(cv);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.put("/eye/:id", authMiddleware, checkEmployer, async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await PostCVModel.findById(id);

    cv.eye = cv.eye + 1;

    await cv.save();

    return;
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.post("/search", authMiddleware, checkEmployer, async (req, res) => {
  try {
    const { job, experience, codeCity } = req.body;

    let result;

    const listcv = await PostCVModel.find().sort({ createdAt: -1 });

    if (experience.trim().length < 1 && codeCity.trim().length < 1) {
      result = listcv.filter(
        (val) =>
          val.job
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .indexOf(
              job
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            ) !== -1
      );
    }
    //
    else if (job.trim().length < 1 && codeCity.trim().length < 1) {
      result = listcv.filter(
        (val) =>
          val.experience
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ===
          experience
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
      );
    }
    //
    else if (job.trim().length < 1 && experience.trim().length < 1) {
      result = listcv.filter(
        (val) =>
          val.codeCity
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ===
          codeCity
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
      );
    }
    //
    else if (codeCity.trim().length < 1) {
      let rs1 = listcv.filter(
        (val) =>
          val.experience
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ===
          experience
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
      );
      result = rs1.filter(
        (val) =>
          val.job
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .indexOf(
              job
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            ) !== -1
      );
    }
    //
    else if (experience.trim().length < 1) {
      let rs1 = listcv.filter(
        (val) =>
          val.codeCity
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ===
          codeCity
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
      );
      result = rs1.filter(
        (val) =>
          val.job
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .indexOf(
              job
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            ) !== -1
      );
    }
    //
    else {
      let rs1 = listcv.filter(
        (val) =>
          val.codeCity
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ===
          codeCity
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
      );
      let rs2 = rs1.filter(
        (val) =>
          val.experience
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ===
          experience
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
      );
      result = rs2.filter(
        (val) =>
          val.job
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .indexOf(
              job
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            ) !== -1
      );
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

module.exports = router;
