const mongoose = require('mongoose');

//assignment schema
const assignmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who submitted the assignment
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the admin responsible for reviewing the assignment
        required: true,
    },
    task: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Status of the assignment
        default: 'pending',
    },
    submissionTime: {
        type: Date,
        default: Date.now, // set to the current date when submitted
    },
});


const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
