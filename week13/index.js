require("dotenv").config();

const express = require("express");
const jwt= require("jsonwebtoken");
const bcrypt = require ("bcrypt");
const z= require("zod");

const {Pool }=require('pg');
const pool = new Pool({
    connectionString: process.env.connectionString
})
const app= express();

app.use(express.json());

const signupSchema = z.object({
    username:z.string().min(3),
    password:z.string().min(3),   // min lenght of password  is 3
    email:z.email()   // is this valid email 
})

//  you write the zod schema for every end point u have , fo which u want the input validations

app.post("/signup", async(req,res)=>{

    const {data,success, error} =signupSchema.safeParse(req.body);   // this will input validation , so it wil return true or false
    if(!success)
    {
          
        return  res.status(403).json({
            
             message:"Incorrect input",
           error:JSON.parse(error), 
        })
    }
    
/*
 const result= =signupSchema.safeParse(req.body);
    if (!result.success) {
    const errors = result.error.issues.map(issue => ({
        field: issue.path[0],
        message: issue.message
    }));

    return res.status(400).json({
        errors
    });
   }
    */


   /* const username =req.body.username;
    const email=req.body.email;           //email password
    const password = req.body.password;
*/
 // we can extract value like this also ,  its maintain type safety
       const username =data.username;
    const email=data.email;           //email password
    const password =data.password;

     // now hash the paswrod 
     const hashpassword = await bcrypt.hash(password,10);

    // this is bad way to do sql using pg -----vulnerable for sql injection
    // console.log("INSERT INTO users(username,email,password) VALUES ('"+username+"', '"+email+"','"+password+"')")
    // await  pool.query("INSERT INTO users(username,email,password) VALUES ('"+username+"', '"+email+"','"+password+"')")


    // console.log(`insert into users (username , email,password) values ('${username}','${email}','${password}')`)
    //  insert into users (username, email , password ) values ('krishan', 'krish@123', '1234');
    // in response , if we wsnt to get the id of inserted row , then we would write -- it has still sql injection issue
  //const response =   await pool.query( `insert into users (username, email , password ) values ('${username}', '${email}', '${password}' ) RETURNING id;`);

    //  another way to do , best way to do  postgresql is .  so it will run our query and just use the value of variable, so no query concattaion by sql injection
    const response =await pool.query("insert into users(username ,email, password) values($1, $2, $3) RETURNING id", 
        [username ,email, hashpassword]
    )

    console.log(response);

    res.json({
        message:"Signup done",
        id:response.rows[0].id
    })

})

app.post("/signin", async (req,res)=>{
     const email = req.body.email;
     const password=req.body.password;

     // now singin , select query 
    //  const response = await pool.query( `select*from users where email ='${email}' AND password ='${password}'`);
    //  console.log(response);
        
    // const response =await pool.query("select*from users where email=$1 AND  password= $2",
        // [email, password])
  const response =await pool.query("select*from users where email=$1",
        [email])

     const userExist= response.rows[0];

     // we got the response , as we have stored the hashed password , we will get the hashed password from he db 
    

    
     if(!userExist)
     {
       return  res.status(403).json({
        message:"incorrect credential",
       })
     }
     else{
          const correctPassword=bcrypt.compare(password,userExist.password) // it compare both , take out salt from the hashedpassword  and match palin password 

           if(correctPassword)
           {
                        res.json({
                    message:"Signin done",    
                    // token: jwt.sign('');  after the singin we send the token in response to user  
                    token:jwt.sign(
                        {userId:userExist.id},
                    "krishan123")
                })
           }
      
}
})


app.listen(3000, ()=>{
    console.log("listen at port 3000")
})
