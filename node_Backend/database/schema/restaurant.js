const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },

    name: { type: String, required: true },
    email_id: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: false },
    suite: { type: String, required: false },
    delivery_type: { type: String, required: false },
    contact: { type: String, required: false },
    start_time: { type: String, required: false },
    end_time: { type: String, required: false },
    image_url: { type: String, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
  },
  { _id: false },
  { collection: "restaurant" }
);

const createModel = function () {
  return mongoose.model("restaurant", restaurantSchema);
};

module.exports.createModel = createModel;
