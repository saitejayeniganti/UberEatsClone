const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: false,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: false,
    },
    restaurent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: false,
    },
    dish_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dish",
      required: false,
    },
    quantity: { type: Number, required: false },
  },
  { _id: false },
  { collection: "orderItem" }
);

const createModel = function () {
  return mongoose.model("orderItem", orderItemSchema);
};

module.exports.createModel = createModel;
