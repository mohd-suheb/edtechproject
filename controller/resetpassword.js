const User = require("../models/User");
const mailssender = require("../utils/mailsender");

exports.resetpasswordtoken = async(req, res)=>{

    try{
        //get email
        const email = req.body.email;
        //check user , eamil validate
        const user = await User.findOne({email:email});
        if(!user){

            return res.status(500).json({
                success:false,
                message:'your email is not regstred with us',
            });
        }
       //generate token
       const token = crypto.randomUUID();
       //upated user by adding token and expiration time
       const updatedtoken = await User.findOne({email:email},
                                               {

                                                token:token,
                                                resetpasswordexpires: Date().now()+5*60*1000,
                                               }, {new: true}
       );

           //create url
           const url = `http://local-host:3000/update-password/${token}`
           //send mail
           await mailsender(email,
                      "password reset link",
                      `password reset link${url}`,
           );
           ///return response
           return res.json({
            success:true,
            message: 'mail send succssfuly , please check email and change password',
           });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'something went wrong while reset pssword',
        })


    }
}

//resetpassword

exports.resetpassword = async(req, res)=>{

    try{
        //fetch data
        const{password, confirmpassword, token} = req.body;
        //validation
        if(password !== confirmpassword){
            return res.status(400).json({
                success:false,
                message:'password do not match',
            });
        }
        //get user details from db using token
        const userdetails = await User.findOne({token:token});
        //if no entry-invalid token
        if(!userdetails){
            return res.status(401).json({
                success:false,
                message: 'token is invalid',
            });
        }
        //time token check
        if(userdetails.resetpasswordexpires<Date.now()){

            return res.status(401).json({
                success:false,
                message: 'token is expires, please regnerate  your token',
            });
        }
        //hashdpassword
        const hashdpassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashdpassword},
            {new:true},
        );

        //return response
        return res,status(200).json({
            success: true,
            message:"password reset succssfully"
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'something went erong'
        })

    }
}