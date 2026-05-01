const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    author : {
        type : String,
        required : true,
         trim : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    Stock : {
        type : Number,
        required : true,
        min : 0
    }
},{timestamps : true});

module.exports = mongoose.model("Book", BookSchema);