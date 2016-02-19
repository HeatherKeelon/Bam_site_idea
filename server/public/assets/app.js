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
//    // use the first element that is "scrollable"
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
//
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

