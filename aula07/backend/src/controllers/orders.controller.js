const getOrders = async (req, res) => {
  res.send({ status: "success", result: "getOrders" });
};

const getOrderById = async (req, res) => {
  res.send({ status: "success", result: "getOrderById" });
};

const createOrder = async (req, res) => {
  res.send({ status: "success", result: "orderCreated" });
};

const updateOrder = async (req, res) => {
  res.send({ status: "success", result: "orderUpdated" });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
};
