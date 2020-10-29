let socket = io();

$(function () {
  var socket = io();
  $('form').submit(function () {

    const username = document.getElementById('username').value;
    const message = document.getElementById('texto').value;

    let userAndMessage = {
      username,
      message
    }

    socket.emit('chat message', userAndMessage);
    $('#texto').val('');
    return false;

  });

  socket.on('chat message', function (msg) {
    msg = `${msg.username}: ${msg.message}`
    $('#messages').append($('<li>').text(msg));
  
    window.scrollTo(0, document.body.scrollHeight);
  });

});