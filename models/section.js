const mongoose = require('mongoose');

const sectionschema = new mongoose.Schema ({

    sectionName:[{
           type: String,
    }],

    subsection:[{
        type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Subsection",
    }],

    
});

module.exports = mongoose.model("Section", sectionschema );
