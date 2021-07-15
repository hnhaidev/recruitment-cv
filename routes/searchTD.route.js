const express = require("express");
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const PostTDModel = require("../models/PostTDModel");

const router = express.Router();

router.get("/", (req, res) => {
  const duongdan = path.join(__dirname, "../views/searchTD.html");
  res.sendFile(duongdan);
});

router.get("/listtd", async (req, res) => {
  try {
    const listcv = await PostTDModel.find().sort({ createdAt: -1 });

    return res.status(200).json(listcv);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await PostTDModel.findById(id);

    return res.status(200).json(cv);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.get("/allcv/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await PostTDModel.findById(id);

    return res.status(200).json(cv.candidates);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.post("/submit/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { name, email, phone, introducing } = req.body;

    if (req.files) {
      const upCV = req.files.cv;
      const cvName = upCV.name;

      upCV.mv("./public/uploads/" + cvName, (err) => {
        if (err) {
          console.log(err);
        }
      });

      const cv = "/uploads/" + cvName;

      const post = await PostTDModel.findById(id);

      const newCandidates = {
        cv,
        name,
        email,
        phone,
        user: _id,
        date: Date.now(),
      };

      if (introducing) newCandidates.introducing = introducing;

      await post.candidates.unshift(newCandidates);
      await post.save();

      return res.redirect("/searchTD");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
});

router.post("/search", authMiddleware, async (req, res) => {
  try {
    const { job, experience, codeCity } = req.body;

    let result;

    const listcv = await PostTDModel.find().sort({ createdAt: -1 });

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
