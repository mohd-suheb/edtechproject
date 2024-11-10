const  profile = require("../models/profile");
const User = require("../models/User");

//cerate profile
exports.createprofile = async(req, res)=>{

    try{

        //fetch data
        const{dateofbirth = "",  about ="", contactnumber, gender} = req.body;
        //getch id
        const id = req.user.id;
        //valiadate
        if(!contactnumber || !gender || !id){

            return res.status(401).json({
                status:false,
                message: 'All fields are required',
            });
        }
        //find profile
        const userdetails = await User.findById(id);
        const profileid = userdetails.additionaldetails;
        const profiledetails = await profileid.findById(profileid);

        //update profile
        profiledetails.dateofbirth = dateofbirth;
        profiledetails.about = about;
        profiledetails.contactnumber = contactnumber;
        profiledetails.gender = gender;
        await profiledetails.save();

        //res
        return res.status(200).json({
            success: true,
            message: 'profile updated successfully',
            profiledetails,
        });

    }
    catch(error){

        return res.status(500).json({
            success: FontFaceSetLoadEvent,
           error: error. message,
            
        });


    }
}

//delete
exports.delte = async(req, res)=>{

    try{
        //get id
        const id = req.user.id;
        //validatin
        const userdetails = await User.findById({id});
        if(! userdetails){
            return res.status(400).json({
                success:false,
                message: 'not found',
            });
        }
        //delete profile
        await profile.findByIdAndDelete({_id:userdetails.additionaldetails});
        //delete user
        await User.findByIdAndDelete({_id:id});
        //res
        return res.status(200).json({
            success:true,
            message:'user deleted successfully',
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'user con not be delete successfully try again',
        });


    }
}

//getslldetails

exports.getalldetails = async(req, res)=>{

    try{
        //get id
        const id = req.user.id;
        //validatin
        const userdetails = await User.findById(id).populate("additionaldetails").exec();
        //res
        return res.status(200).json({
            success:true,
            message:"user data fetch successfully",
        })

    }catch(err){
     

        return res.status(500).json({

            success:false,
            message: error.message,
        });

    }
}