const Order = require("../models/order");
const Book = require("../models/book");
const User = require("../models/user");

const AddOrders = async(req, res)=>{
    try{
      
       userID = req.userInfo.userId;
       console.log("REQ.BODY:", req.body);
       console.log("REQ.USERINFO:", req.userInfo);

       const items = req.body.items;

       if((!items) || items.length===0){
        return res.status(400).json({
            success : false,
            message : "No Items provided"
        })
       }

       // validate the order
       let newtotalPrice = 0;

      for (let item of items){
           const curBook = await Book.findById(item.book);

           if(!curBook){
           return  res.status(404).json({
                success : false,
                message : "Book not found"
            })
           }

           if(curBook.Stock < item.quantity){
            return res.status(400).json({
                success : false,
                message : `Insufficient Stock for Book ${item.book}`
            })
           }

        newtotalPrice += (curBook.price * item.quantity);
       }

       for(let item of items){
          const CurBook = await Book.findById(item.book);
          CurBook.Stock -= item.quantity;
           await CurBook.save();
       }

       const NewOrder = await Order.create({
        user : userID,
        items : req.body.items,
        totalPrice : newtotalPrice
       });

       if(!NewOrder){
        return res.status(400).json({
            success : false,
            message : "Not Able to Place order! Try again later"
        })
       }

       res.status(200).json({
        success : true,
        message : "Order Placed sucessfully",
        order : NewOrder
       });

    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Some err Occured. Please Try Again later"
        })
    }
}

const GetMyOrders = async(req, res)=>{
    try{

        const userId = req.userInfo.userId;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not Found"
            })
        }

        const Orderdata = await Order.find({user : userId})
        .populate("items.book");

        if(!Orderdata || Orderdata.length===0){
           return res.status(500).json({
                success : false,
                message : "You have not placed any order till now!"
            })
        }

        res.status(200).json({
            success : true,
            message : "Order list found succesfully",
            data : Orderdata
        })

    }catch(err){
         console.log(err);
        res.status(500).json({
            success : false,
            message : "Some err Occured. Please Try Again later"
        })
    }
}


const GetAllOrders = async(req, res)=>{
    try{
    const orders =await  Order.find({});

    if(!orders || orders.length===0){
        return res.status(404).json({
            success : false,
            message : "No Order Found"
        })
    }

    res.status(201).json({
        success : true,
        data : orders
    })

   }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Some err Occured. Please Try Again later"
        })
   }
}

const UpdatedStatus = async(req, res)=>{
    try{
        const orderid = req.params.id;
        const status = req.body.status;
        console.log("Order ID:", orderid);
        console.log("Status:", status);

        const OrderStatus = await Order.findByIdAndUpdate(orderid , 
            { status }, 
            { returnDocument: "after", runValidators: true }
        );
   
        if(!OrderStatus){
            return res.status(500).json({
                success : false,
                message : "Order Updation Failed!"
            });
        }

        res.status(201).json({
            success : true,
            message : "Order Status updated Successfully"
        })
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Some err Occured. Please Try Again later"
        })
    }
}

module.exports = {
    AddOrders,
    GetMyOrders,
    GetAllOrders,
    UpdatedStatus
};