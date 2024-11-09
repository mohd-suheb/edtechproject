const User = require("../models/User");
const Tag = require("../models/Tag");
const course = require("../models/Course");
const{imguploadcloudinary} = require("../utils/imageupload");

//create course 
exports.createcourse = async(req, res)=>{

    try{
        //fetch data from req body
        const{course, coursedescription, whatwillyoulearn, price, tag} = req.body;
        //fetc thumbnail
        const thumbnail = req.files.thumbnailimg;
        //validation
        if(!course || !coursedescription || !whatwillyoulearn || !price ||!tag ||!thumbnail){
            
            return res.status(401).json({
                success:false,
                message: 'All field are required',
            });
        }

        //insructor
        const userid = req.user.id;
        const insructordetails = await User.findById({userid});
        console.log();

        if(!insructordetails){
              return res.status(404).json({
                success:false,
                message: 'instructor deatails not found',
              });
        }
       //check given tag is valid or not
       const tagdetails = await Tag.findById(Tag);
       if(!tagdetails){
        return res.status(404).json({
            success:false,
            message: 'instructor deatails not found',
          });
       }

       //upload img to cloudinary
       const thumbanialimg = await imguploadcloudinary(thumbnail, process.env.FOLDER_NAME);

       //create entry for new course
       const newcourse = await course.create({
        courseName,
        coursedescription,
        instructor:instructordetails._id,
        whatwillyoulearn: whatwillyoulearn,
        price,
        tag:tagdetails._id,
        thumbnail:thumbanialimg.secure_url,
       });

       //add the new course  to the user schema of instructor
      await User.findByIdAndUpdate({_id:instructor._id}, {$push:{courses: newcourse._id}}, {new:true});
      //update tag schema
      //todo:hw
      //return rew
        res.status(200).json({
            succss:true,
            message:"course created successfully",
            data:newcourse,
        });
    }
    catch(error){

        console.log(err);
        return res.status(500).json({
            success:false,
            message: "failed to success",
            error: error.message,

        });

    }
}

//get all cousree
exports.getallcourse = async(req, res)=>{

    try{
        //fetch all data
        const alldata = await course.find({}, {
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingandreviw:true,
            studentenrolled:true,
        }).populate("instructor")
        .exec();

    }
    catch(error){

    }
}