const express  = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();

router.get("/welcome", authMiddleware, (req, res)=>{
    res.status(201).json({
        success : true,
        message : "Welcome to page User!"
    })
});

module.exports = router;