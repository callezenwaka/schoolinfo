var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

//Include models
var Class = require('../models/class'); //Class model
var Category = require('../models/category'); //Category model
var Student = require('../models/student'); //Student model

/* GET home page. */
router.get('/', function(req, res, next) {
    Class.getClasses(function(err, classes) {
        if (err) {
            console.log(err);
        } else {
            res.render('classes/index', {
                classes: classes,
                title: 'Classes'
            });
        }
    }, 2);
});

/* GET classes enrollment page. */
router.get('/enroll', function(req, res, next) {
    Class.getClasses(function(err, classes) {
        if (err) {
            console.log(err);
        } else {
            res.render('classes/enroll', {
                classes: classes,
                title: 'Class Enrollment'
            });
        }
    });
});

/* Get class register page. */
router.get('/addClass', function(req, res, next) {
    res.render('classes/addClass', {
        title: 'Class'
    });
});

/* GET class form values. */
router.post('/addClass', function(req, res, next) {
    var title = req.body.title;
    var description = req.body.description;
    var instructor = req.body.instructor;

    //Form field validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('description', 'Description field is required').notEmpty();
    req.checkBody('instructor', 'Instructor field is required').notEmpty();

    //Error variable
    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('classes/addClass', {
            errors: errors,
            title: title,
            description: description,
            instructor: instructor,
        });
    } else {
        var newClass = new Class({
            title: title,
            description: description,
            instructor: instructor
        });
        newClass.save(function(err) {
            if (err) {
                console.log(err);
            }

        });
        res.redirect('/classes');
    }
});

/* GET class description page. */
router.get('/:id/details', function(req, res, next) {
    Class.getClassById([req.params.id], function(err, className) {
        if (err) {
            console.log(err);
        } else {
            res.render('classes/showClass', {
                "className": className,
                title: 'Class Description'
            });
        }
    });
});

/* GET class edit page. */
router.get('/edit/:id', function(req, res, next) {
    Class.getClassById([req.params.id], function(err, className) {
        if (err) {
            console.log(err);
        } else {
            res.render('classes/editClass', {
                "className": className,
                title: 'Class'
            });
        }
    });
});

router.post('/edit/:id', function(req, res, next) {
    var updatedClass = {};
    updatedClass.title = req.body.title;
    updatedClass.description = req.body.description;
    updatedClass.instructor = req.body.instructor;

    //Form field validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('instructor', 'Instructor is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('classes/edit/:id', {
            errors: errors,
            title: title,
            description: description,
            instructor: instructor,
        });
    } else {

        var query = { _id: req.params.id }

        Class.update(query, updatedClass, function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('Class saved to the database');
                res.redirect('/classes');
            }
        });
    }
});

//Delete class details
router.get('/delete/:id', function(req, res, next) {
    Class.getClassByIdAndRemove([req.params.id], function(err, className) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/classes');
        }
    });
});

module.exports = router;