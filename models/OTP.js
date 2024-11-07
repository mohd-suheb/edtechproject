const mongoose = require('mongoose');
const mailsender = require('../utils/mailsender');

const otpschema = new mongoose.Schema({
    emial:{
        type: String,
        required: true,
    },

    otp:{
        type: String,
        required: true,

    },
    createdat:{
        type: Date(),
        default: Date.now(),
        expires: 5*60,
    },
});

//function -> to send emails
async function sendverification(email, otp){

    try{
        const mailresponse = await mailsender(email, "verification email from studynotion", otp);
        console.log("email sent successfull", mailresponse);

    }
    catch(err){
        console.log(err);
        throw err;
    }
}

otpschema.pre("save",  async function(next){
    await sendverification(this.email, this.otp);
    next(); //next middle ware

});

module.exports = mongoose.model("OTP",  otpschema);