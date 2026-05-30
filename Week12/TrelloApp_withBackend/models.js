const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
username:String,
password:String
})

const organizationSchema= mongoose.Schema({
title:String,
description:String,
admin:mongoose.Types.ObjectId,
members:[mongoose.Types.ObjectId]
})

const boardsSchema=mongoose.Schema({
    title: String,
    organizationId:mongoose.Types.ObjectId
})

const issueSchema=mongoose.Schema({
    title:String,
    boardId:mongoose.Types.ObjectId
})


// now make mode of it 

const  userModel = mongoose.model("user" , userSchema)
const  organizationModel = mongoose.model("organization" , organizationSchema)
const  boardsModel = mongoose.model("boards" , boardsSchema)
const  issueModel = mongoose.model("issue" , issueSchema)

// now i have to export hese 
module.exports={
    userModel:userModel,
    organizationModel:organizationModel,
    boardsModel:boardsModel,
    issueModel:issueModel
}

