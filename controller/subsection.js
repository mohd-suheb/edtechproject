const subsection = require("../models/subsection");
const section = require("../models/section");
const { create } = require("../models/Tag");

//create subsection
exports.createsubsection = async(req, res)=>{

    try{

        //fetch data from req body
        const{sectionid,  tittle, timeduration, description} = req.body;

        //fetc file
        const vedio = req.files.videofile;

        if(!sectionid  || !tittle ||! timeduration || !description || !vedio){

              return res.status(400).json({
                success: false,
                message: 'All fields are required',
              });
        }
        //upload vedio to cloudinary
        const uploaddetails = await uploadimagetocloudinary(vedio, process.env.FOLDER_FILE);
        //create a subsection
        const sectiondetails = await subsection.create({
            tittle:tittle,
            timeduratin:timeduration,
            description:description,
            vediourl:uploadDetails.secure_url,
        });

        //updated  section with this subsection   objectid
        const updatedsection = await section.findByIdAndUpdate({_id:sectionid},{$push:{
              subsection:subsectiondetails._id,
        } }, {new:true});  
        //todo
        //ret res
        return res.status(200).json({
            success:true,
            message: 'sub section created successfully',
            updatedsection,
        });

    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:'internal server erroe',
        });

    }


}
//hw updatesub section   delete subsetci