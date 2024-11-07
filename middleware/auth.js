const jwt = reuire("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async(req, res, next)=>{

    try{
        //fetch the token
        const token = req.cookie.token || req.body.token || req.header("Authorization").replace("barrier", "");
        //if token is missing

        if(!token){

            return res.status(401).json({
                success:false,
                message:'Token is mising',
            });
        }
        //verifying the token

    try{
        const decode =  jwt.verify(token, process.env.JWT_SECREAYT);
        console.log(decode);
        req.user = decode;
        

    }
    catch(err){
             //verification issue
             return res.status(400).json({
                success:false,
                message:'something went wrong',
            });

            next();

    }

     
    }
  
    catch(error){
            //verification issue
        return res.status(400).json({
            success:false,
            message:'token is invalid',
        })

    }
}
//isstudent
exports.isstudent = async(req, res)=>{

    try{

        if(req.user.accttype !== "isstudent"){
            return res.status(500).json({
                success:false,
                message:'this is a protected route for student'
            });
        }

    }
    catch(error){
        return res .status(500).json({
            success:false,
            message:'user role can  not be verify plese try again',
        });

    }
}

//isinstructor
exports.isinstructor = async(req, res)=>{

    try{

        if(req.user.accttype !== "instructor"){
            return res.status(500).json({
                success:false,
                message:'this is a protected route for instructor'
            });
        }

    }
    catch(error){
        return res .status(500).json({
            success:false,
            message:'user role can  not be verify plese try again',
        });

    }
}
//isadmin
exports.isadmin = async(req, res)=>{

    try{

        if(req.user.accttype !== "isstudent"){
            return res.status(500).json({
                success:false,
                message:'this is a protected route for admin'
            });
        }

    }
    catch(error){
        return res .status(500).json({
            success:false,
            message:'user role can  not be verify plese try again',
        });

    }
}