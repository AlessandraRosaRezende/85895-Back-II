const orderModel = require('../models/orders.model');

const getOrders = async () => {
  const orders = await orderModel.find();
  return orders;
};

const getOrderById = async (id) => {
  const order = await orderModel.findById(id);
  return order;
}

const createOrder = async (orderData) => {
  const newOrder = await orderModel.create(orderData);
  return newOrder;
}

const updateOrder = async (id, orderData) => {
  const updatedOrder = await orderModel.findOneAndUpdate(id, { $set: orderData }, { new: true });
  return updatedOrder;
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
};