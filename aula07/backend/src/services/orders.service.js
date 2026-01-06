const ordersDao = require('../dao/orders.dao');

const getOrders = async () => {
  return await ordersDao.getOrders();
};

const getOrderById = async (id) => {
  return await ordersDao.getOrderById(id);
};

const createOrder = async (order) => {
  return await ordersDao.createOrder(order);
};

const updateOrder = async (id, order) => {
  return await ordersDao.updateOrder(id, order);
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder
};
