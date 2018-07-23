var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//category Schema
var categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

var Category = module.exports = mongoose.model('Category', categorySchema);

//Fetch all categories
module.exports.getCategories = function(callback, limit) {
    Category.find(callback).limit(limit);
};

//Fetch a single student
module.exports.getCategoryById = function(id, callback) {
    Category.findById(id, callback);
};

//Fetch and delete a category
module.exports.getStudentByIdAndRemove = function(id, callback) {
    Category.findByIdAndRemove(id, callback);
};