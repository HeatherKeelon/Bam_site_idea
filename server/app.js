var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


//Mongo Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/bam4');

mongoose.model('Message', new Schema({"message": String, "sender": String, "email": String, "subject": String}, {collection: 'bammessages'}));
var Message = mongoose.model('Message');

app.set('port', process.env.PORT || 5000);

//Body-Parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

//New message route
app.post('/newmessage', function(req, res){
  var addMessage = new Message({"message": req.body.message, "sender": req.body.name, "email": req.body.email, "subject": req.body.subject});
  console.log("You are in /newmessage");
  addMessage.save(function(err, data){
    if(err) console.log("Error saving message: ", err);
    console.log("This is data: ", data);
    res.send(data);
  });

});

//Inital request to server

app.get('/*', function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function(req, res){
    console.log('Listening on port ' + app.get('port'));
});
