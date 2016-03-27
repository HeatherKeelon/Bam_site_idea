$(document).ready(function(){

  viewMessages();

  $('#messageBox').on('click', '.delete-button', deleteMessage);

  event.preventDefault();
});

function viewMessages() {
  $.ajax({
    type: 'GET',
    url: '/messages/getmessages',
    success: function (data) {
      messageSetup(data);
    }
  })
}

function deleteMessage(){
  var deletedId = {'id': $(this).data('id')};

  $.ajax({
    type: 'DELETE',
    url: '/messages/removemessage',
    data: deletedId,
    success: function(data){
      console.log("This was deleted:", data);

      viewMessages();
    }
  })
}

function messageSetup(data) {
  console.log("This is the data", data);
  $('#messageBox').empty();
  // var $el = $('#messageBox').children().last();

  for(var i=0; i<data.length; i++){
    console.log("You are in the data for loop.");
    $("#messageBox").append("<div class='message-div row'></div>");
    $('#messageBox').children().last().append("<p class='message-sender col-md-12'><strong>Name:</strong> " + data[i].sender + "</p>");
    $('#messageBox').children().last().append("<p class='message-subject col-md-12'><strong>Subject:</strong> " + data[i].subject + "</p>");
    $('#messageBox').children().last().append("<p class='message-content col-md-12'><strong>Message:</strong> " + data[i].message + "</p>");
    $('#messageBox').children().last().append("<span class='message-email col-md-offset-1 col-md-2'><strong>Email:</strong> " + data[i].email + "</span>");
    $('#messageBox').children().last().append("<span class='message-phone col-md-offset-1 col-md-2'><strong>Phone:</strong> " + data[i].phone + "</span>");
    $('#messageBox').children().last().append("<button class='delete-button btn btn-danger col-md-offset-4 col-md-1' data-id='" + data[i]._id + "'>Delete</button>");
  }
}
