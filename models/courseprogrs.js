const mongoose = require('mongoose');

const courseprogress = new mongoose.Schema ({

    courseId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],

    completevedio:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subsection",

    }],
    
});

module.exports = mongoose.model("Courseprogress", courseprogress);
