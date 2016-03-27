var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var passport = require('./strategies/user');
var session = require('express-session');
var user = require('./routes/user');
var index = require('./routes/index');

var messages = require('./routes/messages');
var register = require('./routes/register');


//Mongo Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.set('port', process.env.PORT || 5000);

//Body-Parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));


// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/messages', messages);
app.use('/register', register);
app.use('/', index);

// Mongo Connection //
var mongoURI = "mongodb://bam4:mazDont930291620@ds025429.mlab.com:25429/bam4";
//var mongoURI = "";

var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
   if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.once('open', function(){
   console.log("Connected to Mongo, meow!");
});

app.listen(app.get('port'), function(req, res){
    console.log('Listening on port ' + app.get('port'));
});
