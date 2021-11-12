const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
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
    price: { type: Number, required: false },
    order_date: { type: Date, required: false },
    delivery_type: { type: String, required: false },
    order_status: { type: String, required: false },
  },
  { _id: false },
  { collection: "order" }
);

const createModel = function () {
  return mongoose.model("order", orderSchema);
};

module.exports.createModel = createModel;
