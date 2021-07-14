const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  const duongdan = path.join(__dirname, "../views/index.html");
  res.sendFile(duongdan);
});

module.exports = router;
