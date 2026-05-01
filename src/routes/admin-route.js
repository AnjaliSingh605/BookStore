const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddlware = require("../middleware/admin-middleware");
const router = express.Router();

router.get("/admin", adminMiddlware, authMiddleware, (req, res)=>{
    res.status(201).json({
        success : true,
        message : "Welcome admin Page"
    })
});

module.exports = router;