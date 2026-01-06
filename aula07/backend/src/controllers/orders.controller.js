const ordersDao = require('../dao/orders.dao');

const getOrders = async (req, res) => {
  try {
    const orders = await ordersDao.getOrders();
    res.send({ status: "success", result: orders });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { oid } = req.params;
    const order = await ordersDao.getOrderById(oid);
    if (!order) return res.status(404).send({ status: "error", message: "Order not found" });
    res.send({ status: "success", result: order });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const orderCreated = await ordersDao.createOrder(orderData);
    res.status(201).send({ status: "success", result: orderCreated });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { oid } = req.params;
    const orderData = req.body;
    const orderUpdated = await ordersDao.updateOrder(oid, orderData);
    if (!orderUpdated) return res.status(404).send({ status: "error", message: "Order not found" });
    res.send({ status: "success", result: orderUpdated });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
};
