var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

//Mongo Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/bam4');
mongoose.model('Message', new Schema({"message": String, "sender": String, "email": String, "subject": String}, {collection: 'bammessages'}));
var Message = mongoose.model('Message');

//Body-Parser setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded:true}));

//New message route
router.post('/newmessage', function(req, res){
  var addMessage = new Message({"message": req.body.message, "sender": req.body.name, "email": req.body.email, "subject": req.body.subject});

  console.log("This is addMessage" , addMessage);
  res.send("Done");
});

//Inital request to server
app.set('port', process.env.PORT || 5000);

app.get('/*', function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function(req, res){
    console.log('Listening on port ' + app.get('port'));
});

module.exports = app;
