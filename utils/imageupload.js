const cloudinary = require('cloudinary').v2;


exports.imguploadcloudinar = async (file, folder, quality, height) =>{
    const option = {folder};
    if(height){
    option.height = height;
    }

    if(quality){
        option.quality = quality;
    }

    option.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilelpath, option);


}