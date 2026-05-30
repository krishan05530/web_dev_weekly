const jwt = require('jsonwebtoken');

function AuthMiddleware(req, res, next) {

    // fetch the token from header 

    const token = req.headers.token;
    if (!token) {
        return res.status().json({
            message: "you are not logged in"
        })
    }
        // console.log(req.headers);
    //    console.log(token);

    // now decode the tokon 

    const decoded = jwt.verify(token, "krishan123");
    const userId= decoded.userId;
    if (!userId) {
     
        return res.status(403).json({
            message: "invalid token"
        })
    }
    //now add the unserId to req object so that we can access it in the next middleware or route handler
    req.userId = userId;
    next();
}

module.exports={
    AuthMiddleware
}