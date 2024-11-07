const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");


//send otp
exports.sendotp = async(req, res)=>{

    try{
        //data fetch from req body
        const{email} = req.body;
        //check if email already exists
        const checkmailpersent = await User.findOne({email});
        //if user exits , then return response
        

        if(checkmailpersent){
            return res.status(401).json({
                success:false,
                message: 'user already registred',
            });
        }
       
        //generate otp
        var otp = otpgenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        console.log("otp generated", otp);

         //check unique otp
         let result = await OTP.findOne({otp:otp});

         while(result){
            otp = otpgenerator(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,

            });
            result = await OTP.findOne({otp:otp});

         }
         const otppayload = {email, otp};
         //create an entry otp
         const otp = await OTP.create(otppayload);
         console.log(otppayload);

         //otp sent successfully

         return res.status(200).json({
            status: true,
            message: 'otp sent successfully',
         });
    }
    catch(error){

        return res.status(401).json({
            status:false,
            message: ''
        })

    }
}
//signup
exports.signup = async(req, res)=>{

    try{
        //data fetch from req body
        const{
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            acctype,
            contaactnumber,
            otp
        } = req.body;

        //validate 
        if(!firstname || !lastname || !email || !password || !confirmpassword || !otp){

            return res.status(401).json({

                status: false,
                success:' all fields are requred',
            });
        }
                 //password match 
                 if(password !== confirmpassword){

                    return res.status(403).json({
                        success: false,
                        message: 'password and confirmpassword does not match please try ',
                    });
                 }

                 //already exists
                 const exituser = await User.findOne({email});

                 if(exituser){

                    return res.status(400).json({
                        success: false,
                        message: 'user already existist'

                    });
                 }
                 //find most recent opt stored for user
                 const recentotp = await OTP.find({email}).sort({ceatedat:-1}).limit(1);
                 console.log(recentotp);

                 //valid otp
                 if(recentotp.length == 0){
                    //otp not found

                     return res.status(400).json({
                        success:false,
                        message: "otp not found",
                     });
                 }
                 //valid  otp
                 if(otp !== recentotp){

                    return res.status(400).json({
                        success: false,
                        message: 'invalid otp',
                    });
                 }
                 //hashpassword
                 const hashpassword = await bcrypt.hash(password, 10);
                 //entry create in database
                 const profiledetails = await profile.create({
                    gender:null,
                    dateofbirth:null,
                    about:null,
                    contacctnumber:null,
                 });

                 const user = await User.create({
                    firstname,
                    lastname,
                    email,
                    contacctnumber,
                    password,
                    acctype,
                    additionaldetails:profiledetails._id,
                    image:`https://api.dicebar.com/5.xinitials/svg?seed=${firstname}${lastname}`

                 });

                 return res.status(200).json({
                    success: true,
                    message: 'user successfully registered',
                    user,
                });
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:'user cant be registerde please try again',
        });

    }
}

//login
exports.login = async(req, res) => {

    try{
        //fetch data from req body
        const{email, password} = req.body;
        //validate
        if(!email || !password){

            return res.status(403).json({
                success:false,
                message: 'all field are reuired , please try again',
            });
        }
        //check user exists or not
        const user = await User.findOne({email}).populate("User");
        if(!user){

            return res.status(500).json({
                success:false,
                message: 'user not registered',
            });
        }
        //generate jwt, after password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email,
                id: user._id,
                role: user.role,
            }

            const token = jwt.sign(payload, process.env.JWT_SECREAT, {
                expiresin: "2h",
            });

            user.token = token;
            user.password = undefined;

            //create cookoi
            const option = {
                expires : Date(Date.now()+ 3*24*60*60*1000),
                httponly: true,
            }
            res.cookie("token", token, option).status(200).jsosn({
                success:true,
                token,
                user,
                message:'loged in successfully',
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:'password is incorect',
            })
        }

    }
    catch(error){

        console.log(error);

        return res.status(500).json({

            success: false,
            message: 'login failuere please try again',
        });

    }
}