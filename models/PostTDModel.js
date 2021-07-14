const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostTDSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    nameCompany: { type: String, required: true },
    job: { type: String, required: true },
    codeCity: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    salary: { type: Number, required: true },
    Workingform: { type: String, required: true },
    experience: { type: String, required: true },
    jobdescription: { type: String, required: true },
    interest: { type: String, required: true },
    request: { type: String, required: true },
    formsubmit: { type: String, required: true },
    candidates: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: Date, default: Date.now },
        introducing: { type: String },
        cv: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostTD", PostTDSchema);
