const mongoose = require("mongoose");

const OrderSchema  = new mongoose.Schema({
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required : true
    },
    items: [
        {
      book : {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required : true
      },
      quantity : {
          type : Number,
          required : true,
          min : 1,
      }
    }
   ],
   totalPrice : {
    type : Number,
    required : true,
    min : 0,
   },
   status : {
    type : String,
    enum : ["delivered", "pending" , "shipped"],
    default : "pending"
   }
},{timestamps : true});

module.exports = mongoose.model("Order", OrderSchema);