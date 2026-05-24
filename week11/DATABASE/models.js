const mongoose = require("mongoose")

// for all collection create the mogoose schema and model object

// schma describe how does data is going to look in Table , like USERS table: 

const UserSchema= new mongoose.Schema({
    userName:String,
    password:String
});

const TodoSchema = new mongoose.Schema({
    title:String,
    description:String,
    userId:mongoose.Types.ObjectId
})


const userModel=mongoose.model("user",UserSchema);
const todoModel = mongoose.model("todos", TodoSchema);

module.exports={
    userModel:userModel,
    todoModel:todoModel
}



