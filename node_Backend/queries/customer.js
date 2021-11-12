const mongoose = require("mongoose");
const customerSchema = require("../database/schema/customer").createModel();
const addressSchema = require("../database/schema/address").createModel();
const dishSchema = require("../database/schema/dish").createModel();
const favoriteSchema = require("../database/schema/favorite").createModel();
const orderSchema = require("../database/schema/order").createModel();
const orderItemSchema = require("../database/schema/orderItem").createModel();
const restaurantSchema = require("../database/schema/restaurant").createModel();

exports.insertCustomer = async (modelObject, data, options) => {
  try {
    let model = new modelObject(data);
    return await model.save(options);
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.loginCustomer = async (modelObject, data, options) => {
  try {
    return await modelObject.find({
      email_id: data.email_id,
      password: data.password,
    });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.getCustomerByUsername = async (modelObject, data) => {
  try {
    return await modelObject.find({
      $or: [{ email_id: data.email_id }, { password: data.email_id }],
    });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.getCustomerByID = async (modelObject, data) => {
  try {
    console.log(data);
    return await modelObject.find({ _id: data });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.updateCustomer = async (modelObject, data, options) => {
  try {
    return await modelObject.findOneAndUpdate(
      mongoose.Types.ObjectId(data.id),
      data
    );
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.updateOrder = async (modelObject, data) => {
  try {
    return await modelObject.findOneAndUpdate(
      mongoose.Types.ObjectId(data.id),
      data
    );
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.updateOrderStatus = async (modelObject, data) => {
  try {
    console.log(data);
    return await modelObject.findOneAndUpdate(
      mongoose.Types.ObjectId(data.id),
      { order_status: "Ordered" }
    );
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.getOrdersForCustomer = async (modelObject, data) => {
  try {
    console.log(data);
    return await modelObject.findOneAndUpdate(
      mongoose.Types.ObjectId(data.id),
      { order_status: "Ordered" }
    );
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.makeFavoriteCustomer = async (modelObject, data) => {
  try {
    let model = new modelObject(data);
    return await model.save();
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.makeUnFavoriteCustomer = async (modelObject, data) => {
  try {
    return await modelObject.remove({
      $and: [
        { customer_id: data.customer_id },
        { restaurant_id: restaurant_id },
      ],
    });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.addAddress = async (modelObject, data) => {
  try {
    let model = new modelObject(data);
    return await model.save();
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.deleteOrderItems = async (modelObject, data) => {
  try {
    return await modelObject.remove({
      order_id: data.order_id,
    });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.findOrder = async (modelObject, data) => {
  try {
    console.log(data.customer_id);
    return await modelObject.find({
      $and: [
        { customer_id: mongoose.Types.ObjectId(data.customer_id) },
        { order_status: "In cart" },
      ],
    });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.insertOrder = async (modelObject, data) => {
  try {
    let model = new modelObject(data);
    return await model.save();
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.checkOrderPresent = async (modelObject, data) => {
  try {
    return await modelObject.find({
      $and: [
        { _id: mongoose.Types.ObjectId(data.orderItemsId) },
        { dish_id: dishId },
      ],
    });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.insertOrderItem = async (modelObject, data) => {
  try {
    let model = new modelObject(data);
    return await model.save();
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.updateOrderItem = async (modelObject, data, id) => {
  try {
    console.log(data);
    return await modelObject.findOneAndUpdate(
      {
        $and: [
          { dish_id: mongoose.Types.ObjectId(data.dishId) },
          { order_id: id },
        ],
      },

      { quantity: data.quantity }
    );
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};
