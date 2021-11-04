const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },

    restaurent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    name: { type: String, required: false },
    category: { type: String, required: false },
    cuisine: { type: String, required: false },
    price: { type: Number, required: false },
    main_ingredients: { type: String, required: false },
    description: { type: String, required: false },
    type: { type: String, required: false },
    image_url: { type: String, required: false },
  },
  { _id: false },
  { collection: "dish" }
);

const createModel = function () {
  return mongoose.model("dish", dishSchema);
};

module.exports.createModel = createModel;
