const section = require("../models/section");
const Course = require("../models/Course");

exports.createsection = async(req, res)=>{

    try{

        //fetch data
        const{sectionName, courseid} = req.body;
        //validate
        if(!sectionName || !courseid){
            return res.status(401).json({
                success:false,
                message:'missing properties',
            });
        }
        //create section 
        const newsection = await section.create({sectionName});
        //updatecourse with section id
        const updatecourseid = await Course.findByIdAndUpdate(courseid, {
            $push:{
                coursecontent: newsection.id,
            }

        },   {new:true});
        //hw: use populate to use section/subsection both in the updated corsse details 
                //res
                return res.status(200).json({
                    success:true,
                    message: 'section created succfully',
                    updatecoursedetails,
                })                 
                                  
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message: 'unable to create section successully, please try again',
            error: error.message,
           
        })        

    }
}

//update section 
exports.updatesection = async(req, res)=>{

    try{
        //fetch data
        const{sectionname, sectionid} = req.body;
        //validation
        if(!sectionname || !sectionid){
            return res.status(401).json({
                success:false,
                message:'missing properties',
            });
            
        }
        //update data
        const updatedata = await section.findByIdAndUpdate(sectionid, {sectionname}, {new:true});
        //return res
        return res.status(200).json({
            success:true,
            message: 'updated data succfully',
           
        });  


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: 'unable to create section successully, please try again',
            error: error.message,
           
        })    

    }
}

//delete sction
exports.deletesection = async(req, res)=>{

    try{

        const{sectionid} = req.params;
        await section.findByIdAndDelete(sectionid);
        //todo: do we need to delet the entry from the  coure schema
       return res.status(200).json({
            success:true,
            message: 'delete sectionid sucessfully',
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: 'unable to delete sectionid successully, please try again',
            error: error.message,
           
        })  

    }
}