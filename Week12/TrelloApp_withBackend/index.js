// usernae 
// organiser
// board
// issues


require("dotenv").config();
const { userModel, organizationModel } = require("./models")

const express = require('express');
const jwt = require('jsonwebtoken');
const { AuthMiddleware } = require("./middleware");
const { connectDB } = require("./connectDB")


const app = express();
connectDB();
app.use(express.json());
app.post("/signup", async (req, res) => {
    // now signup , so user will enter username and password on screen and click on submit button and i will receive it in body of req, 
    const username = req.body.username;
    const password = req.body.password;

    // validate if user already exist 
    const userExist = await userModel.findOne({
        username: username,
        password: password
    })

    if (userExist) {
        return res.status(400).json({
            message: "user already exist with this username"

        })

    }
    // now i will create a new user and insert it in user array 

    const newUSer = await userModel.create({
        username: username,
        password: password,
    })

    res.json({
        message: "user created successfully",
        id: newUSer._id
    })
})

app.post("/signin", async (req, res) => {
    // signin , user neter username and passwor d, now i will fetch it from req.body and the match it with the USERS table username , if exist then check for password , if match then signin successfull else invalid password , if username not exist then user not found 
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await userModel.findOne({
        username: username,
        password: password
    })

    if (!userExist) {
        return res.status(401)
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
        userId: userExist._id,
        token: token
    })
})

// else give them entry to the system
app.post("/organization", AuthMiddleware, async (req, res) => {     // authenticated route
    // now after login user can create organisation , so token will be given to it  after login

    const userId = req.userId; // we will get the userId from req object which we have added in AuthMiddleware           after verifying the token
    const newOrg =await organizationModel.create({
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })

    res.json({
        message: "org is created successfully",
        id: newOrg._id// we will return the id of the orgnization which is created
    })
})


/*
app.post("/add-member-to-organization", AuthMiddleware, async (req, res) => {
    const userId = req.userId; // we will get the userId from req object which we have added in AuthMiddleware after verifying the token
    const organizationId = req.body.organizationId;
    const memeberUserName = req.body.memeberUserName;
    // now first we will check that the user who is trying to add member is admin of that orgnization or not , if not then we will return error message that only admin can add member to orgnization
    // const orgaization = ORGANIZATIONS.find(org=> org.id === organizationId); // we found the organization
    const organization = await organizationModel.findOne(
        { _id: organizationId }
    )
    // now we will check that the user who is trying to add member is admin of that orgnization or not
    console.log(organization.admin.toString());
    console.log(userId.toString());
    console.log("organization admin:", organization.admin.toString());
console.log("logged in user:", userId.toString());



    if (!organization || organization.admin.toString() !== userId.toString()) {
        return res.status(403).json({
            message: "either thhis org dosnt exist OR only admin can add member to orgnization"
        })
    }

    //   const memberUser= USERS.find(user=>user.username===memeberUserName);
    const memberUser = await userModel.findOne(
        { username: memeberUserName }
    )

    if (!memberUser) {
        return res.status(404).json({
            message: "user with this username not found"
        })
    }

            const alreadyMember = organization.members.some(
            member => member.toString() === memberUser._id.toString()
        );

        if (alreadyMember) {
            return res.status(400).json({
                message: "user is already a member of this organization"
            });
        }
    // const org = await organizationModel.findById({
    //     organizationId
    // })
    // const org = await organizationModel.findById(organizationId)
const org = await organizationModel.findById(organizationId);

    if (await org.members.includes(memberUser._id)) {
        return res.status(200).json({
            message: 'user elready exist'
        })
    }
    await organizationModel.updateOne({
        _id: organizationId
    }, {
        push: {
            "members": memberUser._id
        }
    })


    if (orgaization.members) {
        orgaization.members.push(memberUser.id);
        res.json({
            message: "new member added to orgnization successfully"
        })
    }
})

*/

app.post("/add-member-to-organization", AuthMiddleware, async (req, res) => {
           
      const userId= req.userId;
      const organizationId= req.body.organizationId;
      const memberUsername=req.body.memberUsername;


      // check this if thier any organization like this 
      const organization=await  organizationModel.findById(organizationId);

console.log("admin:", organization.admin);
console.log("userId:", userId);
console.log(typeof organization.admin);
console.log(typeof userId);

   // now check does ogranization exist, and is this organization admin is the user
   if(!organization || organization.admin.toString()!==userId)
   {
    return res.status(411).json({
message:"Either this org doesnt exist or you are not an admin of this org"
    })
   }
        
   // find the user, which admin want to enter 
        const memberUser = await userModel.findOne({
            username: memberUsername
        });

        if (!memberUser) {
            return res.status(404).json({
                message: "user with this username not found"
            });
        }
        // check if already member
        const alreadyMember = organization.members.includes(memberUser._id);

         if (alreadyMember) {
           return res.status(400).json({
               message: "user is already a member of this organization"
           });
       }

       // add new member
       /* 
          await organization.updateOne({                   
        _id:organizationId            // on this basis
       },{
         $push:{               
            "members":memberUser._id          // add this one
         }
       })

       */

/*
       const result =await organizationModel.updateOne({                   
        _id:organizationId
       },{
         $push:{
            "members":memberUser._id
         }
       })
         */


    //     we have another way to do this 
    organization.members.push(memberUser._id);
    await organization.save();
    
       console.log(result);

res.status(200).json({
    message: "new member added to organization successfully",
    id:memberUser
});
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
app.get("/organization", AuthMiddleware, async(req, res) => {
             const userId= req.userId;
             const organizationId= req.query.organizationId;
   


      // check this if thier any organization like this 
      const organization=await  organizationModel.findById(organizationId);
        // now check does ogranization exist, and is this organization admin is the user
        if(!organization || organization.admin.toString()!==userId)
        {
            return res.status(411).json({
        message:"Either this org doesnt exist or you are not an admin of this org"
            })
        }


   /*
    res.json({
        organization: {
            ...organization,  // spread operator , copy the organization object and then modify the members array to return the username of all the members instead of userid
            members:  organization.members.map( async (memberId) => {
                const user= await userModel.find({
                    _id:memberId
                })
                return {
                    id: user._id,
                    username: user.username
                }
            })
        }
    })
        */
/*
 res.json({
        organization:organization  // spread operator , copy the organization object and then modify the members array to return the username of all the members instead of userid
    })
*/

const members=await userModel.find({
    _id:organization.members
})

 res.json({
        organization:{
            title:organization.title,
            description:organization.description,
            members:members.map(m=>({
                username:m.username,
                _id:m._id
            }))
        }  
    })



})


// delete req
// remove people from organization
app.delete("/members", AuthMiddleware, async (req, res) => {


     const userId= req.userId;
      const organizationId= req.body.organizationId;
      const memberUsername=req.body.memberUsername;


      // check this if thier any organization like this 
      const organization=await  organizationModel.findById({
        _id:organizationId
      });
        // now check does ogranization exist, and is this organization admin is the user
        if(!organization || organization.admin.toString()!==userId)
        {
            return res.status(411).json({
        message:"Either this org doesnt exist or you are not an admin of this org"
            })
        } 


         const memberUser = await userModel.findOne({
            username: memberUsername
        });


        if (!memberUser) {
            return res.status(404).json({
                message: "user with this username not found"
            });
        }


                    // now i have to delete the member from the organization
                    /*
            await organizationModel.updateOne({                   
                    _id:organizationId
                },{
                    $pull:{
                        "members":memberUser._id
                    }
                })
    */

                organization.members = organization.members.filter(
                    id => id.toString() !== memberUser._id.toString()
                );
              await organization.save();


    res.status(200).json({
        username:memberUsername,
        message: "succesfully deleted the member"
    })

})



app.get("/", (req, res) => {
    res.send("welcome trello");
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})