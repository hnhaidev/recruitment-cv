module.exports.checkEmployer = async (req, res, next) => {
  let { role } = req.user;

  if (role === "employer" || role === "root") {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports.checkAdmin = async (req, res, next) => {
  let { role } = req.user;

  if (role === "root") {
    next();
  } else {
    res.redirect("/");
  }
};
