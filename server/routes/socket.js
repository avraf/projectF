// Keep track of which names are used so that there are no duplicates
var helperLib = require('../lib/helpers'),
    userNames = helperLib.userNames,
    smartBot  = helperLib.smartBot;

// export function for listening to the socket
module.exports = function (socket) {
  var name = userNames.getGuestName();

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: userNames.get(),
    questions: smartBot.botKnownQuestions
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('send:message', function(data) {
    var qa;
    
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });

    if(/^a:/i.test(data.message)){
      qa = data.message.replace(/^a:\s*/i, '');   
      smartBot.addAnswer(qa);
    }else if(/^q:/i.test(data.message)){
      qa = data.message.replace(/^q:\s*/i, '')
                       .replace(/\?$/, '')
                       .toLowerCase();

      if(!smartBot.wasQuestionAsked(qa)){        
        smartBot.addQuestion(qa);
      }else if(smartBot.wasQuestionAnswered(qa)){
        socket.emit('bot:answer', smartBot.getAnswer(qa));
        socket.broadcast.emit('bot:answer', smartBot.getAnswer(qa));
      }

    } 
       
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });

};
