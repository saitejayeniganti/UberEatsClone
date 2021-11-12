const mongoose = require("mongoose");
const customerSchema = require("../database/schema/customer").createModel();
const addressSchema = require("../database/schema/address").createModel();
const dishSchema = require("../database/schema/dish").createModel();
const favoriteSchema = require("../database/schema/favorite").createModel();
const orderSchema = require("../database/schema/order").createModel();
const orderItemSchema = require("../database/schema/orderItem").createModel();
const restaurantSchema = require("../database/schema/restaurant").createModel();

exports.insertRestaurant = async (modelObject, data) => {
  try {
    let model = new modelObject(data);
    return await model.save();
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.loginRestaurant = async (modelObject, data) => {
  try {
    return await modelObject.find({
      $and: [{ email_id: data.email_id }, { password: data.password }],
    });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.getRestaurantByUsername = async (modelObject, data) => {
  try {
    return await modelObject.find({ email_id: data.email_id });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.getRestaurantByID = async (modelObject, data) => {
  try {
    return await modelObject.find({ _id: data.id });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.updateRestaurant = async (modelObject, data) => {
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

exports.insertDish = async (modelObject, data) => {
  try {
    let model = new modelObject(data);
    return await model.save();
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.getDishes = async (modelObject, data) => {
  try {
    return await modelObject
      .find({ restaurant_id: data })
      .populate("restaurent_id");
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.getDishDetails = async (modelObject, data) => {
  try {
    return await modelObject.find({ _id: data.id });
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

exports.updateDish = async (modelObject, data) => {
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

exports.getOrdersForRestaurant = async (id) => {
  try {
    return await orderItemSchema
      .find({ order_id: id })
      .populate("restaurent_id")
      .populate("dish_id");
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};
