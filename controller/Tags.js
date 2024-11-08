const Tag = require("../models/Tag");

//create tag function 

exports.createtag = async(req, res) => {

    try{
     //fetch data from req body
     const{name, description} =  req.body;
     //validate
     if(!name || !description){
        return res.status(400).json({
            success:false,
            message: 'All fields are required'
        });
     }

     //cretre entry in db
     const tagdetails = await Tag.create({
        name:name,
        description:description
     });
     console.log(tagdetails);

     //return res
     res.status(200).json({
        success:true,
        message:'  tag created success fully'
     })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message,
         });

    }
}

//get alldata
exports.getalldata = async(req, res)=>{

    try{
        //getall data
        const alldata = await Tag.find({}, {name:true, description:true});

        //retunr response
        res.status(200).json({
            success:true,
            message:' fetch data success fully'
         })

    }
    catch(err){

        res.status(500).json({
            success:false,
            message: err.message,
         });


    }
}