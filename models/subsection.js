const mongoose = require('mongoose');

const subsectionschema = new mongoose.Schema ({

    tittle:{
        type:String,
    },

    timeduration:{
        type:String,
    },

    description:{
        type: String,
    },
    vediourl:{
        type: String,
    },

    
});

module.exports = mongoose.model("Subsection", subsectionschema );
