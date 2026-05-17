// usernae 
// organiser
// board
// issues




const express = require('express');
const jwt = require('jsonwebtoken');
const {AuthMiddleware} = require("./middleware");


console.log(AuthMiddleware);
console.log(typeof AuthMiddleware);

let USER_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUE_ID = 1;

/*
const USERS = [{
    id: 1,
    username: 'user1',
    password: 'pass1'
}, {
    id: 2,
    username: 'user2',
    password: 'pass2'
}]


const ORGANIZATIONS = [{
    id: 1,
    title: '100xdev org',
    description: " learningncodeing plafromr",
    admin: "1",  // its the id of user1 who is the admin of this orgnization
    members: [2] //id of user2  who are the members of this orgnization

},
{
    id: 2,
    title: "ramag org",
    description: " learningncodeing plafromr",
    admin: "1",
    members: []
}];

const BOARDS = [{
    id: 1,
    title: '100xdev webitse frontend',
    organizationId: 1,     // it belong to which organistion , i.e id
}]

const ISSUES = [{
    id: 1,
    title: 'create login page',
    boardId: 1, // it belong to which board , i.e id

}, {
    id: 2,
    title: "allow admin to create more ocurses",
    boardId: 1, // it belong to which board , i.e id
}]
*/



const USERS = []


const ORGANIZATIONS = [];

const BOARDS = []

const ISSUES = []


const app = express();
app.use(express.json());
app.post("/signup", (req, res) => {
    // now signup , so user will enter username and password on screen and click on submit button and i will receive it in body of req, 
    const username = req.body.username;
    const password = req.body.password;

    // validate if user already exist 
    const userExist = USERS.find(user => user.username === username);
    if (userExist) {
        res.status(400).json({
            message: "user already exist with this username"

        })
        return;
    }
    // now i will create a new user and insert it in user array 
    USERS.push({
        username: username,
        password: password,
        id: USER_ID++
    })

    res.json({
        message: "user created successfully"
    })
})

app.post("/signin", (req, res) => {
    // signin , user neter username and passwor d, now i will fetch it from req.body and the match it with the USERS table username , if exist then check for password , if match then signin successfull else invalid password , if username not exist then user not found 
    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find(user => user.username === username && user.password === password);
    if (!userExist) {
        res.status(401)
            .json({
                message: "invalid credentials"
            })
    }

    // now user exist so we will create a token for this user and send it to client , so that in future req client will send this token in header and we will verify the token and give access to user if token is valid
    // create jwt token 
    // it takes two tineg , object , secret key
    const token = jwt.sign(
        { userId: userExist.id },
        "krishan123"
    )

    // now send the token to client in res
    res.json({
        userId: userExist.id,
        token: token
    })



})

// else give them entry to the system
app.post("/organization", AuthMiddleware, (req, res) => {     // authenticated route
    // now after login user can create organisation , so token will be given to it  after login

    const userId = req.userId; // we will get the userId from req object which we have added in AuthMiddleware           after verifying the token
    ORGANIZATIONS.push({
        id: ORGANIZATION_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: userId, // the user who create the orgnization will be the admin of that orgnization
        members: [] // initially no members in orgnization
    })

    res.json({
        message: "org is created successfully",
        id: ORGANIZATION_ID - 1 // we will return the id of the orgnization which is created
    })
})

app.post("/add-member-to-organization", AuthMiddleware, (req, res) => {
    const userId = req.userId; // we will get the userId from req object which we have added in AuthMiddleware after verifying the token
    const organizationId = req.body.organizationId;
    const memeberUserName= req.body.memeberUserName;;
    // now first we will check that the user who is trying to add member is admin of that orgnization or not , if not then we will return error message that only admin can add member to orgnization
    const orgaizatio = ORGANIZATIONS.find(org=> org.id === organizationId); // we found the organization
    // now we will check that the user who is trying to add member is admin of that orgnization or not
    if(!orgaizatio || orgaizatio.admin!==userId){
        return res.status(403).json({
            message: "either thhis org dosnt exist OR only admin can add member to orgnization"
        })
    }
    // if its admin of the organisation , wo he can add member to orgnization , so we will find the user with this email and get its id and then add that id to members array of that orgnization
    // now i will find the user which memeberUserName i have , so first find the userid of  this username 


  const memberUser= USERS.find(user=>user.username===memeberUserName);


  if(!memberUser){
    return res.status(404).json({
        message: "user with this username not found"
    })
  }
  
  // we should also check if that user is already a member of that orgnization or not , if already a member then we will return error message that this user is already a member of this orgnization
  if(orgaizatio.members.includes(memberUser.id)){
    return res.status(400).json({
        message: "user is already a member of this orgnization"
    })
  }

    orgaizatio.members.push(memberUser.id);
    res.json({
        message: "new member added to orgnization successfully"
    })
   
})



app.post("/board", (req, res) => {

})

app.post("/issue", (req, res) => {

})

// path params
// backend.trello.com/board/1  -- it should return all the issues that belong to board with id 1


// query params
//bakcend.trelllo.com/boards/?organisationId=1   -- it should return all the issues that belong to board with id 1
app.get("/boards/", (req, res) => {

})

app.get("/get-issues", (req, res) => {

})


app.get("/members", (req, res) => {

})


app.put("/issues", (req, res) => {

})

// localhost:3000/organization?organizationId=1 , i will send the detail of this organization 
app.get("/organization",AuthMiddleware, (req, res) => {

 // her i should simply show 
// olny the admin of the meber can use it 
const userId= req.userId;
//  user will send the organizationid in the query parame
const orgnaizationId=parseInt( req.query.organizationId);  // query paramter is always string , but in our system we are using int .
// this organization admin should be same to userid 


// chekc if this organisaton exist or not .
 const organization=ORGANIZATIONS.find(org=> org.id===orgnaizationId);

 if(!organization || organization.admin!==userId){
    return res.status(403).json({  
        message: "either this orgnization dosnt exist or you are not the admin of this orgnization"
  })
 }


// yes the retrun . so i will return the username of all the member of this organisation 
/*
const memebrs= organization.members;// but its the userID ,,so find the username of all userid 

const memeberUserNames= USERS.map(user=>{
    // if userid exist in USER array and that userid is also present in members array of that orgnization then return the username of that user
    if(organization.members.includes(user.id)){
        return user.username;
    }
})
res.json({
    organization,
    memberUserNames: memeberUserNames
})
    */

res.json({
    organization:{
        ...organization,  // spread operator , copy the organization object and then modify the members array to return the username of all the members instead of userid
        members:organization.members.map(memberId=>{
            const user = USERS.find(user=>user.id===memberId);

            return {
                id: user.id,
                username: user.username
            }
        })
    }
})




})




// delete req
// remove people from organization
app.delete("/members", AuthMiddleware, (req, res) => {

  const userId = req.userId; // we will get the userId from req object which we have added in authMiddleWare after verifying the token
    const organizationId = req.body.organizationId;
    const memeberUserName= req.body.memeberUserName;;
    // now first we will check that the user who is trying to add member is admin of that orgnization or not , if not then we will return error message that only admin can add member to orgnization
    const orgaization = ORGANIZATIONS.find(org=> org.id === organizationId); // we found the organization
    // now we will check that the user who is trying to add member is admin of that orgnization or not
    if(!orgaization || orgaization.admin!==userId){
        return res.status(403).json({
            message: "either thhis org dosnt exist OR only admin can add member to orgnization"
        })
    }
    // if its admin of the organisation , wo he can add member to orgnization , so we will find the user with this email and get its id and then add that id to members array of that orgnization
    // now i will find the user which memeberUserName i have , so first find the userid of  this username 


  const memberUser= USERS.find(user=>user.username===memeberUserName);


  if(!memberUser){
    return res.status(404).json({
        message: "user with this username not found"
    })
  }

  // so deleet this user from members array of that orgnization
  orgaization.members = orgaization.members.filter(memberId=> memberId!==memberUser.id);

  res.status(200).json({
    usernae:memeberUserName,
    message:"succesfully deleted the member"
  })

})

app.get("/", (req, res) => {
    res.send("welcome trello");
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})