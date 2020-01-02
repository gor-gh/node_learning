const mongoose = require('mongoose'),
    { Schema } = mongoose,
    courseSchema = new Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        maxStudents: {
            type: Number,
            default: 0,
            min: [0, "Course can't have a negative number of students"]
        },
        cost: {
            type: Number,
            default: 0,
            min: [0, "Course can't have a negative cost"]
        }
    },
        {
            timestamps: true
        }
    );
module.exports = mongoose.model("Course", courseSchema);