var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();


//Mongo Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/bam4');

mongoose.model('Message', new Schema({"message": String, "sender": String, "email": String, "phone": String, "subject": String}, {collection: 'bammessages'}));
var Message = mongoose.model('Message');

//New message route
router.post('/newmessage', function(req, res){
  var addMessage = new Message({"message": req.body.message, "sender": req.body.name, "email": req.body.email, "phone": req.body.phone, "subject": req.body.subject});
  console.log("You are in /newmessage");
  addMessage.save(function(err, data){
    if(err) console.log("Error saving message: ", err);
    res.send(data);
  });

});

router.get('/getmessages', function(req, res){
  Message.find({}, function(err, data){
    if(err){
      console.log("Error getting messages", err);
    }else{
      res.send(data);
    }
  });
})

router.delete('/removemessage', function(req, res){
  console.log("This is what is you are removing", req.body.id);

  Message.findByIdAndRemove({"_id": req.body.id}, function(err, data){
    if (err) console.log("Delete error", err);
    res.send(data);
  });
})

module.exports = router;
