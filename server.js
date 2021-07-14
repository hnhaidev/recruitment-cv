const express = require("express");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");

var cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config.env" });
const connectDB = require("./utils/connectDB");
const PORT = process.env.PORT || 3000;
const app = express();

//
app.use(express.static("public"));

app.use(cookieParser());
// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload());

const homeRoutes = require("./routes/index.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const sinupRoutes = require("./routes/singup.route");
const editorRoutes = require("./routes/editor.route");
const postCVRoutes = require("./routes/postCV.route");
const postTDRoutes = require("./routes/postTD.route");
const searchCVRoutes = require("./routes/searchCV.route");
const searchTDRoutes = require("./routes/searchTD.route");
const adminRoutes = require("./routes/admin.route");
const mydocumentRoutes = require("./routes/mydocument.route");

//connect DB
connectDB();

app.use("/", homeRoutes);
app.use("/login", authRoutes);
app.use("/register", sinupRoutes);
app.use("/editor", editorRoutes);
app.use("/user", userRoutes);
app.use("/postCV", postCVRoutes);
app.use("/postTD", postTDRoutes);
app.use("/searchCV", searchCVRoutes);
app.use("/searchTD", searchTDRoutes);
app.use("/admin", adminRoutes);
app.use("/my-document", mydocumentRoutes);

app.listen(PORT);
