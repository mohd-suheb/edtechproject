const mongoose = require('mongoose');

const profileschema = new mongoose.Schema ({
    gender:{
        type: String,
    },

    dateofbirth:{
        type: String,
    },
    about:{
        Type: String,
        trim: true,
    },

    contactnumber:{
        type:Number,
        required: true,

        
    }
});


module.exports = mongoose.model("profile", profileschema);

    
