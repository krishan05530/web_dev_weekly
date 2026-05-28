
const mongoose = require("mongoose");


 const connectDB= async  function (){
 try{
    console.log(process.env.MONGO_URL);
          await mongoose.connect(process.env.MONGO_URL);
          console.log("connected to DB");
 }
 catch(error){

    console.log("MongoDB connection Failed")
    console.log(error);
    process.exit(1);
 }
 }

 module.exports={
    connectDB
 }