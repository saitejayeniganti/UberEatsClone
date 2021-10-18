const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    emailid: { type: String, required: true },
    password: { type: String, required: true },
    // course_id: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
    // student_id: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
    // assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    // available: { type: Number, required: true },
  },
  { _id: false },
  { collection: "customer" }
);

const createModel = function () {
  return mongoose.model("customer", customerSchema);
};

module.exports.createModel = createModel;
