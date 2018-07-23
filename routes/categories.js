var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

//Include models
var Category = require('../models/category');
var Student = require('../models/student'); //Student model
var Class = require('../models/class'); //Class model

/* GET home page. */
router.get('/', function(req, res, next) {
    Category.getCategories(function(err, categories) {
        if (err) {
            console.log(err);
        } else {
            res.render('categories/index', {
                categories: categories,
                title: 'Categories'
            });
        }
    });
});

/* Get category register page. */
router.get('/addCategory', function(req, res, next) {
    res.render('categories/addCategory', {
        title: 'Register'
    });
});

/* GET category form values. */
router.post('/addCategory', function(req, res, next) {
    var title = req.body.title;
    var description = req.body.description;

    //Form field validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('description', 'Description field is required').notEmpty();

    //Error variable
    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('categories/addCategory', {
            errors: errors,
            title: title,
            description: description,
        });
    } else {
        var newCategory = new Category({
            title: title,
            description: description,
        });
        newCategory.save(function(err) {
            if (err) {
                console.log(err);
            }

        });
        res.redirect('/categories');
    }
});

/* GET category description page. */
router.get('/:id/details', function(req, res, next) {
    Category.getCategoryById([req.params.id], function(err, category) {
        if (err) {
            console.log(err);
        } else {
            res.render('categories/showCategory', {
                "category": category,
                title: 'Description'
            });
        }
    });
});

/* GET category edit page. */
router.get('/edit/:id', function(req, res, next) {
    Category.getCategoryById([req.params.id], function(err, category) {
        if (err) {
            console.log(err);
        } else {
            res.render('categories/editCategory', {
                "category": category,
                title: 'Category'
            });
        }
    });
});

router.post('/edit/:id', function(req, res, next) {
    var updatedCategory = {};
    updatedCategory.title = req.body.title;
    updatedCategory.description = req.body.description;

    //Form field validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('categories/edit/:id', {
            errors: errors,
            title: title,
            description: description,
        });
    } else {

        var query = { _id: req.params.id }

        Category.update(query, updatedCategory, function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('Category saved to the database');
                res.redirect('/categories');
            }
        });
    }
});

//Delete category details
router.get('/delete/:id', function(req, res, next) {
    Category.getCategoryByIdAndRemove([req.params.id], function(err, category) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/categories');
        }
    });
});

module.exports = router;