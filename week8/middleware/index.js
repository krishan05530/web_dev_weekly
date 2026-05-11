const express = require("express");
const app = new express();

app.use(express.json());


let requestcount = 0;





// now any time we have any req we do requestcount++; in all the function . 
/*
app.get("/multiple", function (req, res) {
    requestcount++;

    const a = req.query.a;
    const b = req.query.b;

    const ans = a * b;

    res.json({
        ans: ans
    })


})

app.get("/status", function (req, res) {
    requestcount++;
    res.send("up");
})

app.get("/requestCount", function (req, res) {
    requestcount++;
    res.send({
        requestcount
    })
})
app.get("/", function (req, res) {
    res.send("Welcome to server");
});
*/


// but we can use middleware , so for any req ,we recieve we do count++; then call that req

/*
app.use(function (req,res, next){
    requestcount++;
    next();
})
*/





// or we can  define outiside and call it 
function middleware(req, res, next) {
    requestcount++;
    console.log(req.method, req.url, requestcount);
    next();  // here we are using next() , so next in route get called , but we can top teh req here tooo by not using next()
}

/*
function middleware(req, res, next) {
    requestcount++;
    console.log(req.method, req.url, requestcount);
    //next();  // here we are using next() , so next in route get called , but we can top teh req here tooo by not using next()
}
*/

// we can modify the req
/*
function middleware(req, res, next) {
    requestcount++;
    req.name="krishan"    // here we can modify the req
    console.log(req.method, req.url, requestcount);
    next();  // here we are using next() , so next in route get called , but we can top teh req here tooo by not using next()
}
*/

/*
app.get("/multiple", function (req, res) {    // for thsi route , middleware() will not be applicable
    const a = req.query.a;
    const b = req.query.b;
    const ans = a * b;
    res.json({
        ans: ans
    })
})


app.use(middleware);  /// this middleware is only applicable to those route which are below it . 

// their is another way , in whcih 
app.use(express.json());

app.get("/status", function (req, res) {

    res.send("up");
})

app.get("/requestCount", function (req, res) {

    res.send({
        requestcount
    })
})

*/



// their is another way , in whcih 

// another way we can use middleware
// by this methose we can specify which req to have middleware
app.get("/multiple", middleware, function (req, res) {    // now middleware , so before processing this route , goes to middlewware
    const a = req.query.a;
    const b = req.query.b;
    const ans = a * b;
    res.json({
        ans: ans
    })
})




app.get("/status", middleware, function (req, res) {   // now middleware , so before processing this route , goes to middlewware

    res.send("up");
})

app.get("/requestCount", function (req, res) {

    res.send({
        requestcount
    })
})


// 





app.get("/", function (req, res) {
    res.send("Welcome to server");
});
// this line start express server on 3000 port
app.listen(3000, () => {
    console.log("Server running on port 3000");
}); 