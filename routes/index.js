var express = require('express');
var router = express.Router();

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
            res.render('index', {
                layout: 'main.hbs',
                title: 'Schoolinfo!!!!',
                "classes": classes,
            });
        }
    });
});

router.get('/about', function(req, res, next) {
    res.render('about', {
        title: 'About Schoolinfo!!!!',
    });
});


module.exports = router;