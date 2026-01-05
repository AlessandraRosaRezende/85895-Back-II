const { Router } = require("express");
const orderController = require("../controllers/orders.controller");

const router = Router();

router.get("/", orderController.getOrders);
router.get("/:oid", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:oid", orderController.updateOrder);

module.exports = router;
