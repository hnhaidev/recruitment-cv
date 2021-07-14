const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCVSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    codeCity: { type: String, required: true },
    experience: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    job: { type: String, required: true },
    cv: { type: String, required: true },
    eye: { type: Number, default: 0 },
    desire: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostCV", PostCVSchema);
