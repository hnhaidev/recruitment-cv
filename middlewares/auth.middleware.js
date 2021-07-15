const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.redirect("/login");
    }

    const { userId } = jwt.verify(req.cookies.token, process.env.jwtSecret);

    await UserModel.findOne({
      _id: userId,
    }).then((data) => {
      if (data) {
        req.userId = userId;
        req.user = data;
        next();
      } else {
        return res.redirect("/login");
      }
    });

    // req.userId = userId;
    // next();
  } catch (error) {
    console.error(error);
    return res.redirect("/login");
  }
};
