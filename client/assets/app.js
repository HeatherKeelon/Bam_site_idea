$(document).ready(function() {

  $('#submitBox').on('click', '.submit', function(event){
      console.log("You clicked submit!");

      $.each($('#messageForm').serializeArray(), function(i, field){
        toBeSent[field.name]=field.value;
      });
      console.log("To Be Sent", toBeSent);

      $('#messageForm').find('input[type=text]').val('');
      $('#messageForm').find('input[type=email]').val('');
      $('#messageArea').val('');

      postToServer(toBeSent);

      alert("Your message has been sent.");

      event.preventDefault();
  });

    pullReviews();

    $('#nav').on('click', '.review-button', function(){
      $.smoothScroll({
        scrollTarget: '#review'
      });
      return false;
    });

    $('#nav').on('click', '.about-button', function(){
      $.smoothScroll({
        scrollTarget: '#about'
      });
      return false;
    });

    $('#nav').on('click', '.home-button', function(){
      $.smoothScroll({
        scrollTarget: '#home'
      });
      return false;
    });

    $('#nav').on('click', '.contact-button', function(){
      $.smoothScroll({
        scrollTarget: '#contact'
      });
      return false;
    });

    $('#nav').on('click', '.find-button', function(){
      $.smoothScroll({
        scrollTarget: '#find'
      });
      return false;
    });

});

var toBeSent = {};

function submitMessage(){
    console.log("empty");
}

function postToServer() {
    $.ajax({
        type: 'POST',
        url: '/messages/newmessage',
        data: toBeSent,
        beforeSend: function () {
            console.log("Going to server");
        },
        success: function postMessage(data) {
            console.log("This was sent: ", data);
        }
    })
}

function pullReviews() {
    $.ajax({
        type: 'GET',
        url: '/data/review.json',
        success: function(data) {
            console.log("GET success");
            console.log("This is data", data);
            setCarousel(data.bam);
        }
    });
}

function setCarousel(reviews) {
    var increment = 0;
    console.log("This is reviews", reviews);
    var i = 0;


        for (i = 0; i < reviews.length; i++) {
            var $el = $('.review-carousel').children().last();
            setTimeout(function () {
                $('.review-carousel').fadeOut(200, function () {
                    $('.review-carousel').empty();
                    $('.review-carousel').append('<h4 class="review-text">"' + reviews[increment]["review"] + '"</h4>').hide().fadeIn();
                    increment++;
                    if (increment>reviews.length-1) {
                        setTimeout(function() {
                            resetCarousel(reviews);
                        }, 5000);
                    }
                });
            }, 5000 * i);
        }

}


function resetCarousel(reviews) {
    console.log("Reset Carousel hit.");
    setCarousel(reviews);
}
