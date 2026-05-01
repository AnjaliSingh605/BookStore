const express = require("express");
const router = express.Router();

const {AddOrders, GetMyOrders, GetAllOrders,  UpdatedStatus} = require("../controllers/order-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");


router.post("/place", authMiddleware, AddOrders);
router.get("/get", authMiddleware, GetMyOrders);
router.get("/get-all", authMiddleware, adminMiddleware, GetAllOrders);
router.put("/:id/status", authMiddleware, adminMiddleware, UpdatedStatus);

module.exports = router;