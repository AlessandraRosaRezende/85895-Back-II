const ordersService = require('../services/orders.service');

const getOrders = async (req, res) => {
  try {
    const orders = await ordersService.getOrders();
    res.send({ status: "success", result: orders });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ordersService.getOrderById(id);
    if (!order) return res.status(404).send({ status: "error", message: "Order not found" });
    res.send({ status: "success", result: order });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const orderCreated = await ordersService.createOrder(orderData);
    res.status(201).send({ status: "success", result: orderCreated });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    const orderUpdated = await ordersService.updateOrder(id, orderData);
    res.send({ status: "success", result: orderUpdated });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder
};
