//  this is todo app mongoose
const express = require("express");
const app = express();
const {AuthMiddleware} = require("./middleware");
const jwt= require("jsonwebtoken");

app.use(express.json());
let CURRENT_USER_ID=1;
let CURRENT_TODO_ID=1;

let USERS = [];
let TODOS = [];;
app.get("/", (req,res)=>{
    res.send("hello world");
})



// create  signup and signin
app.post("/signup", (req,res)=>{
const username = req.body.username;
const password = req.body.password;

const existingUser= USERS.find(user=>user.username===username);
if(existingUser)
{
    return res.status(400).json({
        message:"user is already exist"
    })
}

// if not then its fresh entry so , store them 
USERS.push({
   id:CURRENT_USER_ID++,
    username:username,
    password:password
})

   res.status(200).json({
    id:CURRENT_USER_ID-1,
    message:"singup complete"
   })
})

app.post("/signin", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExist= USERS.find(user=>user.username===username && user.password===password);
    if(!userExist)
    {
        res.status(403).json({
            message:"incorrect credential"
        })
    }
    
    // as its good so need to create the jwt token adnd 
    const token = jwt.sign(
        {userId:userExist.id},
        "krishan123"
    )

res.status(200).json({
    token:token,
    message:"login done"
})
})


// now create the todo
app.post("/todo", AuthMiddleware,(req,res)=>{
const userId= req.userId;
const title =req.body.title;
const description = req.body.description;

TODOS.push({
    id:CURRENT_TODO_ID++,
    title:title,
    description:description,
    userId:userId
})
res.status(400).json({
    id:CURRENT_TODO_ID-1,
    message:"todo done"
})
})

app.delete("/todo/:todoId", AuthMiddleware,(req,res)=>{
  // now how will it delete it
 // first verify if this user is admin of this todo
 const userId= req.userId;
 const todoId= parseInt(req.params.todoId);
 const doesUserOWn=TODOS.find(todo=> todo.userId ===userId &&todo.id===todoId);
 if(!doesUserOWn)
 {
    return res.status(400).json({
        message:"you are not the owner of this todo"
    })
 }
 else{
   TODOS=TODOS.filter(todo=>todo.id!==todoId);
 res.status(200).json({
    message:"deleted"
 })
 }
 
})

app.get("/todo",AuthMiddleware, (req,res)=>{

      const userId= req.userId;
    const userTodo=TODOS.find(t=> t.id===userId );

    if(!userTodo)
    {
       return res.status(200).json({
        message:'todo for this id is not present'
       })
    }
res.status(200).json({
    message:"todo done",
    todo:userTodo
})
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
