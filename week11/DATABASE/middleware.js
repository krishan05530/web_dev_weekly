const jwt = require("jsonwebtoken")

function AuthMiddleware(req,res,next)
{// cehck it has token or not

    const token = req.headers.token;

    if(!token)
    {
         return res.status(400).json({
            message:"you are not singin"
        })
    }
    // now verify this token 
    const decode = jwt.verify(token,"krishan123");
            
    const userId=  decode.userId;

  if(!userId)
  {
    res.status(400).json({
        message:"invalid userID"
    })
  }

  // evrything is good so i will attch user ID to req
  req.userId=userId;
  next();
}

// i have to xport it
module.exports={
    AuthMiddleware
}