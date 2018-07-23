var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Class Schema
var classSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true,
    },
    lessons: [{
        lesson_number: { type: Number },
        lesson_title: { type: String },
        lesson_body: { type: String }
    }]
}, { timestamps: true }, { collection: 'className' });

var Class = module.exports = mongoose.model('Class', classSchema, 'className');

//Fetch all classes
module.exports.getClasses = function(callback, limit) {
    limit = 2;
    Class.find(callback).limit(limit);
};


//Fetch a single student
module.exports.getClassById = function(id, callback) {
    Class.findById(id, callback);
};

//Fetch and delete a class
module.exports.getClassByIdAndRemove = function(id, callback) {
    Class.findByIdAndRemove(id, callback);
};