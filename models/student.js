var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Student Schema
var studentSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    address: [{
        street_name: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    }],
    category: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    classes: [{
            class_id: { type: [mongoose.Schema.Types.ObjectId] },
            class_title: { type: String }
        }] //date: { type: Date, default: Date.now }
}, { timestamps: true });

var Student = module.exports = mongoose.model('Student', studentSchema);


//Fetch all students
module.exports.getStudents = function(callback, limit) {
    Student.find(callback).limit(limit);
};

//Fetch a single student
module.exports.getStudentById = function(id, callback) {
    Student.findById(id, callback);
};

//Fetch a single student and delete
module.exports.getStudentByIdAndRemove = function(id, callback) {
    Student.findByIdAndRemove(id, callback);
};

module.exports.register = function(info, callback) {
    student_id = info['student_id'];
    class_id = info['class_id'];
    class_title = info['class_title'];

    //Student.findByIdAndUpdate(student_id,update { $set: { "classes": { class_id: class_id, class_title: class_title } } }, { new: true }, callback);
    var query = { student_id: student_id };
    Student.findOneAndUpdate(query, { $push: { classes: { class_id: class_id, class_title: class_title } } }, { upsert: true },
        callback
    );
}

//Save student
// module.exports.saveStudent = function(newStudent, callback) {
//     console.log('Saving student details to the database');
//     newStudent.save();
// };{ "_id": mongoose.Types.ObjectId(student_id) }