const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success : true,
            message : "Access Denied no token provided, Please Login"
        })
    }

    // decode this token
    try{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userInfo = decodedToken;

    next();
  }catch(Err){
     return res.status(500).json({
        success : true,
        message : "Access Denied No token provided, Please login to continue"
     })
  }
};

module.exports = authMiddleware;