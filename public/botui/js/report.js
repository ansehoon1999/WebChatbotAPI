var $messages = $('.messages-content');

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  insertMessage()
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

  var url = 'http://localhost:3000/send-report';
 const data = new URLSearchParams();
     fetch(url, {
       method: 'POST',
       body:data
     }).then(res => res.json())
      .then(response => {
        console.log(response);
      serverMessage(response.Reply);
      })
       .catch(error => console.error('Error h:', error));
  $('.message-input').val(null);


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



  setTimeout(function() {
     $('.message.loading').remove();
     $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');

   }, 100 + (Math.random() * 20) * 100);

 }
