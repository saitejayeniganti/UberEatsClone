const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },

    name: { type: String, required: false },
    mobile: { type: String, required: false },
    email_id: { type: String, required: false },
    password: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    address: { type: String, required: false },
    nick_name: { type: String, required: false },
    about: { type: String, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
    image_url: { type: String, required: false },
  },
  { _id: false },
  { collection: "customer" }
);

const createModel = function () {
  return mongoose.model("customer", customerSchema);
};

module.exports.createModel = createModel;
