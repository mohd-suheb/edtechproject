const  nodemailer = require('nodemailer');

const mailsender = async(email, tittle, body) =>{

    try{

        let transporter = nodemailer.createTransport({
            host: password.env.MAIL_HOST,
            auth:{
                user: password.env.MAIL_USER,
                pass: password.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: `studynotion || love by- babbbar`,
            to :`${email}`,
            subject: `${tittle}`,
            html:`${body}`,



        });
        console.log(info);
    }

    catch(err){

        console.log(err);
    }
}

module.exports = mailsender;