
const { default: axios } = require("axios");
const express = require("express");   // create an instace of express 
const path = require("path");
// now create 


const app = express();  // create the first http server where i will have end points 

app.use(express.json()); //its middleware  , write if u want to use .body    // express.json() return anther function

// app.use() lets u define mmiddleware , its function , app.use() allow to put a middleware in req, res chain ,
app.use(function (req, res, next) {  // its user define middlware
    console.log("hi");
    next();
})



//http://localhost:3000/sum?a=1&b=2      // its string
app.get("/sum", function (req, res) {
    const a = parseInt(req.query.a); // now it becomes int          // js    "1"+"1"="11"
    const b = parseInt(req.query.b);   // here i am using query parameter

    const sum = a + b;
    res.json({
        ans: sum
    })

    // res.send(sum);
    //  res.send("<b><u>" +sum.toString() + "</b></u>");
});


/*if user send data like this  use path params
http://localhost:3000/sum/1/200   --its called dynamic paremter, we use "Path parameter" to extract thr paraeter
http://localhost:3000/sum/1/200  , here path parameyer i.e "sum" is fixed and /1/2 are dynamic parameter
 so any req that comes to "/sum/:a/:b"  should get handles by 
*/

app.get("/multply/:a/:b", function (req, res) {
    const a = parseInt(req.params.a); // now it becomes int          // js    "1"+"1"="11"
    const b = parseInt(req.params.b);   // here i am using query parameter

    const ans = a * b;
    res.json({
        ans: ans
    })
});


app.get("/sum/:a/:b", function (req, res) {
    const a = parseInt(req.params.a); // now it becomes int          // js    "1"+"1"="11"
    const b = parseInt(req.params.b);   // here i am using query parameter

    const ans = a + b;
    res.json({
        ans: ans
    })
});

// post req and i am sedig data in body , not in url -> post req with json body to this specfic url
app.post("/sum", function (req, res) {
    const a = parseInt(req.body.a); // now it becomes int          // js    "1"+"1"="11"
    const b = parseInt(req.body.b);   // here i am using query parameter

    const ans = a + b;
    res.json({
        ans: ans
    })
});


app.get("/", function (req, res) {
    // display html
    // res.send("<html>Hi welcome to calculator app</html>")
    res.sendFile(path.join(__dirname, "index.html"));
    //  res.sendFile("./index.html")

})


// if data is coming in body of req then how to fectch it 
app.post("/multiply", function (req, res) {
    const a = parseInt(req.body.a); // now it becomes int          // js    "1"+"1"="11"
    const b = parseInt(req.body.b);

    const sum = a + b;
    res.json({
        ans: sum
    })



})


app.get("/sub");
app.get("/div");
app.get("/mul");

app.listen(3000, () => {
    console.log("Server running on port 3000");
}); // its port one a single m/c we can have multiple  , on each port one server is runnign


//----------Path Parameters-------------------------------------------------------------------------------------------------



// --axios is library
//  fetch is native api


// middleware 