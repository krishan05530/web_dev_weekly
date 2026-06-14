/*import { password } from "bun";
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:string,
    password:string
});


const userModel = mongoose.model("user",userSchema)     
module.exports={  // currenlty we export like this 
    userModel
}
*/


// and currenlty we import like this
// const  {userModel} =require("./models");


// ------------------------------------------------- now new modern way to export is 
//export const  userModel = mongoose.model("user",userScehma)  
// export const TodoModel=mongoose.model("todo", totoscehama);
// and import like 
//import {userModel, TodoModel}  from "./models"


// ----------- default export    ,
// export default UserModel      
// and we import it lke  , wihtout bracket
// import UserModel  from "./models"



/// import express from "express"   -- it is default import 
