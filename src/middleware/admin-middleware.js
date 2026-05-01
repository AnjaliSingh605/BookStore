const isAdmin = (req, res, next)=>{
    const role = req.userInfo.role;

    if(role!=="admin"){
      return res.status(401).json({
        success : false,
        message : "Admin role required"
      });
    }

     next();
};

module.exports = isAdmin;
