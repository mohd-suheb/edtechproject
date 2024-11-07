const mongoose = require('mongoose');

const courseschema = new mongoose({

    courseName: {
        type:String,
    },

    coursedecsription:{
        type: String,
    },

    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },

    whatwillyoulearn:{
        type: String,
    },

    courseContent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],

    ratingandreviw:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndreviw",

    }],

    price:{

        type: Number,
    },
    thumbnail:{

        type: String,
    },

tag:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",

},

studentprofile:[{

    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,

}]

});

module.exports = mongoose.model("Course", courseschema);