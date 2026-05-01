const express = require("express");
const  {  getAllBooks,
    getSingleBook,
    deleteBook,
    AddNewBook ,
    UpdateBook } = require("../controllers/book-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();

router.get("/get", authMiddleware, getAllBooks);
router.get("/get/:id", authMiddleware, getSingleBook);
router.post("/add", authMiddleware, adminMiddleware, AddNewBook);
router.put("/update/:id", authMiddleware, adminMiddleware, UpdateBook);
router.delete("/delete/:id",authMiddleware, adminMiddleware, deleteBook);

module.exports = router;