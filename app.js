require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var expressMessages = require('express-messages');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var flash = require('connect-flash');
mongoose.connect('mongodb://127.0.0.1/schoolinfo', {
    useMongoClient: true
});

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
const URL = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI_DEV;
// const URL = process.env.MONGODB_URI_DEV;
mongoose.connect(URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`));

var index = require('./routes/index');
var users = require('./routes/users');
var students = require('./routes/students');
var classes = require('./routes/classes');
var categories = require('./routes/categories');
var students = require('./routes/students');

var app = express();

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));

//Express session
// app.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true
// }));

//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Connect-Flash
app.use(flash());

//Global vars
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/students', students);
app.use('/classes', classes);
app.use('/categories', categories);
app.use('/students', students);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen( process.env.PORT || 8000, () => {
    console.log('Server started on port', process.env.PORT);
});
module.exports = app;