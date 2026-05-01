const mongoose = require("mongoose");

const ConnectDB = async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_DB_URL);
      console.log("Database connected Sucessfully");
    }catch(err){
      console.log("Database connection failed");
      process.exit(1);
    }
}

module.exports = ConnectDB;