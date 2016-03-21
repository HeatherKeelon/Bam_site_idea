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



    //$('#billStaff').on('click', '.staff-button', function(){
    //    console.log("Modal button pushed");
    //    $('#austinModal').modal('toggle');
    //});
//    function filterPath(string) {
//        return string
//            .replace(/^\//,'')
//            .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
//            .replace(/\/$/,'');
//    }
//    var locationPath = filterPath(location.pathname);
//    var scrollElem = scrollableElement('html', 'body');
//
//    $('a[href*=#]').each(function() {
//        var thisPath = filterPath(this.pathname) || locationPath;
//        if (  locationPath == thisPath
//            && (location.hostname == this.hostname || !this.hostname)
//            && this.hash.replace(/#/,'') ) {
//            var $target = $(this.hash), target = this.hash;
//            if (target) {
//                var targetOffset = $target.offset().top;
//                $(this).click(function(event) {
//                    event.preventDefault();
//                    $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
//                        location.hash = target;
//                    });
//                });
//            }
//        }
//    });
//
// //    // use the first element that is "scrollable"
//    function scrollableElement(els) {
//        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
//            var el = arguments[i],
//                $scrollElement = $(el);
//            if ($scrollElement.scrollTop()> 0) {
//                return el;
//            } else {
//                $scrollElement.scrollTop(1);
//                var isScrollable = $scrollElement.scrollTop()> 0;
//                $scrollElement.scrollTop(0);
//                if (isScrollable) {
//                    return el;
//                }
//            }
//        }
//        return [];
//    }

});

var toBeSent = {};

function submitMessage(){
    console.log("empty");
}



function postToServer() {
    $.ajax({
        type: 'POST',
        url: '/newmessage',
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
