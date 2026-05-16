const express = require("express");
const app = new express();
const jwt = require("jsonwebtoken");
app.use(express.json());

// import middleware

const { authMiddleWare } = require("./middelware");
// creaet a note 
// get all y notes 
const notes = [{ username: "krishan", note: "got to gym" }]; /// this is in memeory , this is bad, this is inmemory 
const users = [
    {
        username: "krish",
        password: "123"
    },
    {
        username: "rahul",
        password: "1234"
    }
];

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userexist = users.find(user => user.username === username);
    if (userexist) {
        return res.status(403).json({
            message: "user with this username already exist"
        })
    }
    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "you signed up"
    })
})


app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userexist = users.find(user => user.username === username && user.password === password);
    if (!userexist) {
        res.status(403).json({
            message: "incorrect credential"
        })
        return;
    }   

    // const token = username + "i90990909dfs";
    const token = jwt.sign(
        {
            username: username
        }, "krishan123"
    )


    res.json({
        token: token
    })

})




// // POST - creta a note // auhenticated notes
// app.post("/notes", function (req, res) {
//     // so now i need to check  user is authencated or not 
//     const token = req.headers.token;
//     if (!token) {
//         res.status(403).send({
//             message: "your are not logged in"
//         });
//         return;
//     }
//     // now decode this
//     const decode = jwt.verify(token, "krishan123") // vreify with the secret key
//     const username = decode.username;
//     console.log("username",username);
//     // 
//     if (!username) {
//         res.status(403).json({
//             message: "malformed token"
//         })
//         return;
//     }
//     const note = req.body.note;
//     notes.push({ username, note });
//     // just store them in arru 
//     res.json({
//         message: "Done"
//     });
// })




//auth middleware is used here
app.post("/notes", authMiddleWare,function (req, res) {  
    const username = req.username; // we have added this in middleware
    const note = req.body.note;
    notes.push({ username, note });
    // just store them in arru 
    res.json({
        message: "Done"
    });
})



// // get all the notes for backend  // authenticated
// app.get("/notes", function (req, res) {
//     //    now it will also verify the user 
//     const token = req.headers.token;
//     if (!token) {
//         return res.status(403).json({
//             message: "your are not logged in "
//         })
//     }
//      const decode = jwt.verify(token, "krishan123") 
//     const username = decode.username;
//     if (!username) {
//         return res.status(403).json({
//             message: "malformed user "
//         })
//     }
//     // now return this user all notes
//     const userNotes = notes.filter(note => note.username === username)
//     res.json({
//         notes: userNotes
//     }
//     )
// })



// get all the notes for backend  // auth middleware is used here
app.get("/notes", authMiddleWare,function (req, res) { 
    const username = req.username; // we have added this in middleware
    // now return this user all notes
    const userNotes = notes.filter(note => note.username === username)
    res.json({
        notes: userNotes
    }
    )
})







// it serve the html
app.get("/", function (req, res) {
    const path = require("path");
    res.sendFile(path.join(__dirname, "frontend", "index.html"));

})

app.get("/signup", function (req, res) {
    const path = require("path");
    res.sendFile(path.join(__dirname,"frontend", "signup.html"));

})

app.get("/signin", function (req, res) {
    const path = require("path");
    res.sendFile(path.join(__dirname,"frontend", "signin.html"));

})


app.listen(3000, function () {
    console.log(" running the server on 3000 port ");
})