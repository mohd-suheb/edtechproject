const {instance} = require("../config/razorpy");
const User = require("../models/User");
const Course = require("../models/Course");
const mailsender = require("../utils/mailsender");
const {courseenrolmentemail} = require("../mail/template/courseenrolmentemail");

//capture patment
exports.capturepayment = async(req, res)=>{

    try{
        //get courseid and userid
        const {course_id} = req.body;
        const userid = req.user.id;
        //validation
        //valid courseid
        if(!course_id){
            return res.json({
                success:false,
                message: 'please provide valid course id',
            });
        }
        //valid coursedetails
        let course;
        try{

            course = await Course.findById(course_id);
            if(! course ){
                return res.json({
                    success:false,
                    message: 'could not  find the course',
                });
            }
            //user already pay  for the  same course
            const uid = new mongoose.Types.objectId(course_id);
            if(course.studentenrolled.include(uid)){
                return res.status(400).json({
                    success:false,
                    message: 'student is alredy enrolled',
                });
            }
        }
        catch(err){

        }
        //ordeer create
        const amount = Course.price;
        const currency = "INR";

        const options = {
            amout: amount*100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes:{
           courseid: course_id,
           userid,
            }
        };
        //initaite the pamnet using razorpay
        try{
            const paymentresponse = await instance.orders.create(option);
            console.log(paymentresponse);
            //return response
            return res.status(200).json({
                success:true,
                message: "student is already enrolled",
                courseName:course.courseName,
                coursedescription: course.coursedescription,
                thumbnail:course. thumbnail,
                orderid:paymentresponse.id,
                currency:paymentresponse. currency,
                amount:paymentresponse.amount,
            })
        }

        catch(err){
            console.err(err);
            return res.json({
                success:false,
                message: "could not initiate order",
            });
        }
       

    }
    catch(error){
        console.log(error);
        return res.status(500).json({

            success:false,
             error: error.message,
        });
    }
}


//verify signarure and razorpay and sserver
exports.verifysignature = async(req, res)=>{

    const webhook = "12345678";
    const signature = req.header["x-razorpay-signature"];

   const shasum =  crypto.creatHMAC("sha123", webhook);
   shasum.update(json.strigfy(req.body));
   const digest = shasum.digest("hex");

   if(signature === digest){
    console.log("payment is authorised");

    const{courseid, userid} = req.body.payload.payment.entity.notes;

    try{
        //fullfll the action

        //find course and enroll the student it
        const enrolledcourse = await Course.findAndUpdate({_id: courseid},
             {$push: {studentenrolled:userid}}, {new: true});

             //return rwas
             if( !enrolledstudent){

                return res.status(500).json({

                    success:false,
                     
                   message: "course not found",
                });

             }

             //find the the student and add the course  to their list enrolled course me
             const  enrolledstudent = await User.findAndUpdate({_id:userid}, 
                                           {$push:{course:courseid}}, {new: true},
             );
             if( !enrolledstudent){

                return res.status(500).json({

                    success:false,
                     
                   message: "course not found",
                });

             }

          //mail send krdo confirm wala
          const emailresponse = await mailsender(
                                       enrolledstudent.email,
                                       "congratulation from codehelp",
                                       "congratualtion, you are onboarded into new codehelp course"

          );
          console.log(emailresponse);
          return res.status(200).json({

            success:true,
            message: "signature verified and course added",
          });



    }
    catch(err){
        return res.status(500).json({

            success:false,
            message: err.message,
          });

    }
   }
else{

    return res.status(400).json({
        success:false,
        message: "invlid reques",
    });
}
}