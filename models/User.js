const mongoose = reuire('mongoose');


const userschema =  new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        trim: true,

    },

    lastName:{
        type: String,
        required:true,
        trim: true,

    },

    email:{
        type: String,
        required:true,
    },

    password:{
        
        type: String,
        required:true,
        },

        acctType:{
            type: String,
            enum:["admin" , "student", "instructor"],
            required: true,
        },
        acctDetails:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: profile,

        },
        additiondetails:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "course",

        },

        courses:[{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "profile",
        }],

        image:{
            type: String,
            required: true,
        },
        token:{
            type: String,
        },

        resetpasswordExpires:{
            type:Date(),
        },

        courseprogress:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "couresprogress",
        }],
    
});

module.exports = mongoose.model("User", userschema);

   
