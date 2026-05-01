const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const {RegisterUser, LoginUser, ChangePassward}= require("../controllers/auth-controller");
const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/changePassward", authMiddleware, ChangePassward);

module.exports = router;