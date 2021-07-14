const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormCVSchema = new Schema(
  {
    img: { type: String, required: true },
    path: { type: String, required: true },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormCV", FormCVSchema);
