function authMiddleWare(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(403).json({
            message: "your are not logged in "
        })
    }
     const decode = jwt.verify(token, "krishan123") 
    const username = decode.username;
    if (!username) {
        return res.status(403).json({
            message: "malformed user "
        })
    }


    // now will  add the username to req object so that we can access it in the next middleware or route handler
    req.username = username;// modified the req obbject and added username to it

    next();

}

module.exports={
authMiddleWare
}

// middelware is a function which has access to req,res and next and it can modify req and res and it can also call next to pass the control to the next middleware or route handler

// we will use this middleware to protect our routes and to get the username from the token and add it to req object so that we can access it in the route handler