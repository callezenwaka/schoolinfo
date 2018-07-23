var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

//Include models
var Student = require('../models/student'); //Student model
var Category = require('../models/category'); //Category model
var Class = require('../models/class'); //Class model

/* GET home page. */
router.get('/', function(req, res, next) {
    Student.getStudents(function(err, students) {
        if (err) {
            console.log(err);
        } else {
            res.render('students/index', {
                "students": students,
                title: 'students'
            });
        }
    });
});

/* GET student classes page. */
router.get('/:id/classes', function(req, res, next) {
    Student.getStudentById([req.params.id], function(err, student) {
        if (err) {
            console.log(err);
        } else {
            var student_id = [req.params.id];
            Class.getClasses(function(err, classes) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('students/classes', {
                        "student": student,
                        "classes": classes,
                        "student_id": student_id,
                        title: 'Student Classes'
                    });
                }
            });

        }
    });
});

/* Get register for classes page. */
// router.post('/classes/register', function(req, res) {
//     var info = [];
//     info['student_id'] = req.body.student_id;
//     info['class_id'] = req.body.class_id;
//     info['class_title'] = req.body.class_title;

//     Student.register(info, function(err, student) {
//         if (err) throw err;
//         console.log(student);
//     });
//     res.redirect('/students/classes');
// });

router.post('/classes/register', function(req, res) {
    var student_id = req.body.student_id;
    var class_id = req.body.class_id;
    var class_title = req.body.class_title;

    Student.findOneAndUpdate(student_id, { "$set": { "classes": { "class_id": class_id, "class_title": class_title } } }, { upsert: true }, function(err, student) {
        if (err) {
            console.log(err);
        } else {
            console.log(student);
            res.send(student);
        }
        //res.redirect('/students');
    });
    // res.redirect('/students');

});

/* GET register page. */
router.get('/addStudent', function(req, res, next) {
    res.render('students/addStudent', {
        title: 'Register'
    });
});

/* GET form values. */
router.post('/addStudent', function(req, res, next) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var gender = req.body.gender;
    var street_name = req.body.street_name;
    var city = req.body.city;
    var state = req.body.state;
    var category = req.body.category;
    var phone_number = req.body.phone_number;
    var email = req.body.email;

    //Form field validation
    req.checkBody('first_name', 'First name field is required').notEmpty();
    req.checkBody('last_name', 'Last name field is required').notEmpty();
    req.checkBody('street_name', 'Street name field is required').notEmpty();
    req.checkBody('city', 'City field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    req.checkBody('email', 'Email must be a valid email address').notEmpty();
    req.checkBody('state', 'State field is required').notEmpty();
    //req.checkBody('phone-number', 'Phone number field is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('students/addStudent', {
            errors: errors,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            street_name: street_name,
            city: city,
            state: state,
            category: category,
            phone_number: phone_number,
            email: email
        });
    } else {
        var newStudent = new Student({
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            address: [{
                street_name: street_name,
                city: city,
                state: state,
            }],
            category: category,
            phone_number: phone_number,
            email: email
        });
        newStudent.save(function(err) {
            if (err) {
                console.log(err);
            }

        });
        //console.log('Student saved to the database');
        //req.flash('success', 'Student added');
        //res.location('/');
        res.redirect('/students');
    }
});

/* GET student profile page. */
router.get('/:id/details', function(req, res, next) {
    Student.getStudentById([req.params.id], function(err, student) {
        if (err) {
            console.log(err);
        } else {
            res.render('students/showStudent', {
                "student": student,
                title: 'Profile'
            });
        }
    });
});

/* GET student edit page. */
router.get('/edit/:id', function(req, res, next) {
    Student.getStudentById([req.params.id], function(err, student) {
        if (err) {
            console.log(err);
        } else {
            res.render('students/editStudent', {
                "student": student,
                title: 'Profile'
            });
        }
    });
});

router.post('/edit/:id', function(req, res, next) {
    var updatedStudent = {};
    updatedStudent.first_name = req.body.first_name;
    updatedStudent.last_name = req.body.last_name;
    // updatedStudent.gender = req.body.gender;
    updatedStudent.street_name = req.body.street_name;
    updatedStudent.city = req.body.city;
    updatedStudent.state = req.body.state;
    updatedStudent.category = req.body.category;
    updatedStudent.phone_number = req.body.phone_number;
    updatedStudent.email = req.body.email;

    //Form field validation
    req.checkBody('first_name', 'First name field is required').notEmpty();
    req.checkBody('last_name', 'Last name field is required').notEmpty();
    req.checkBody('street_name', 'Street name field is required').notEmpty();
    req.checkBody('city', 'City field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    req.checkBody('state', 'State field is required').notEmpty();
    //req.checkBody('phone-number', 'Phone number field is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('students/edit/:id', {
            errors: errors,
            first_name: first_name,
            last_name: last_name,
            // gender: gender,
            street_name: street_name,
            city: city,
            state: state,
            category: category,
            phone_number: phone_number,
            email: email
        });
    } else {

        var query = { _id: req.params.id };

        Student.update(query, updatedStudent, function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('Student saved to the database');
                res.redirect('/students');
            }
        });
    }
});

//Delete student details
router.get('/delete/:id', function(req, res, next) {
    Student.getStudentByIdAndRemove([req.params.id], function(err, student) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/students');
        }
    });
});

module.exports = router;