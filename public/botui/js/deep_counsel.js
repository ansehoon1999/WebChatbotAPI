var $messages = $('.messages-content');
var serverResponse = "wala";


var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    serverMessage("당신의 고민을 들어줄 토닥이입니당~~ ");
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

  var url = 'http://localhost:3000/send-msg4';
 const data = new URLSearchParams();

   for (const pair of new FormData(document.getElementById("mymsg"))) {
       data.append(pair[0], pair[1]);
       console.log(pair)
   }

   console.log("abc",data)
     fetch(url, {
       method: 'POST',
       body:data
     }).then(res => res.json())
      .then(response => {

        setTimeout(function() {
       console.log(response);
      serverMessage(response.Reply);
       speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
}, 5000);

      })
       .catch(error => console.error('Error h:', error));


  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault()
  insertMessage();

}

function serverMessage(response2) {


  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();


  setTimeout(function() {
     $('.message.loading').remove();
     $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
     updateScrollbar();
   }, 100 + (Math.random() * 20) * 100);

 }
