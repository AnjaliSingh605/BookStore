const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register-User-Controller

const RegisterUser = async(req, res)=>{
    try{
        const {name, email, password, role} = req.body;
        
        const UserExist = await User.findOne({email});
        if(UserExist){
           return res.status(400).json({
            success : false,
            message : "A User with the same email already exist"
           })
        }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password : hashedPassword,
        role : role || "user"
    });

    await newUser.save();

    if(newUser){
        res.status(200).json({
            success : true,
            messgae : "New User Registered Successfully"
        });
    }else{
        res.status(400).json({
            success : false,
            message : "Unable to Register use. Please Try again"
        })
    }

    }catch(err){
        console.log("Error found" , err);
        res.status(500).json({
            success : false,
            message : "Some Error Ocuured. Try Again later"
        })
    }
}

// Login User

const LoginUser = async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        const UserExist = await User.findOne({email});
        if(!UserExist){
           return res.status(400).json({
            success : false,
            message : "A User with the given email doesn't exist"
           })
        }

        const PasswordMatch = await bcrypt.compare(password, UserExist.password);

        if(!PasswordMatch){
            res.status(400).json({
            success : false,
            message : "Invalid Credential"
        })
        }

        const accessToken = jwt.sign({
            userId : UserExist._id,
            username : UserExist.name,
            role : UserExist.role
        },
            process.env.JWT_SECRET_KEY,
        {
            expiresIn : "30m"
        })

        res.status(200).json({
            success : true,
            message : "User LoggedIn successfully",
            accessToken
        })


    }catch(err){
        console.log("Error found" , err);
        res.status(500).json({
            success : false,
            message : "Some Error Ocuured. Try Again later"
        })
    }
}

// ChangePassword 
 
const ChangePassward = async(req, res)=>{
    try{
       const userid = await req.userInfo.userId;

       const {oldPassword , newPassword} = req.body;

       const UserExist = await User.findById(userid);

       if(!UserExist){
        return res.status(400).json({
            sucess : false,
            message : "User not found"
        })
       }

       const PasswordCorrect = await bcrypt.compare(oldPassword, UserExist.password);

       if(!PasswordCorrect){
        return res.satus(400).json({
            success : false,
            message : "Incorrect Credential"
        })
       }

        // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

   UserExist.password = hashedPassword;
    await UserExist.save();

    res.status(200).json({
        success : true,
        message : "Password Changes Successfully"
    })

    }catch(err){
        console.log("Error found" , err);
        res.status(500).json({
            success : false,
            message : "Some Error Ocuured. Try Again later"
        })
    }
}

module.exports = {RegisterUser, LoginUser, ChangePassward};