function AppCtrl($scope, socket) {

  // Socket events  

  socket.on('init', function (data) {
    $scope.name = data.name;
    $scope.users = data.users;
  });

  socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });

  socket.on('bot:answer', function (data) {
    $scope.messages.push({
      user: 'SmartBot',
      text: 'Easy as pie! ' + data
    });
  });

  // notify user arrived
  socket.on('user:join', function (data) {
    $scope.messages.push({
      user: 'SmartBot',
      text: data.name + ' has joined.'
    });
    $scope.users.push(data.name);
  });

  // notify user left
  socket.on('user:left', function (data) {
    $scope.messages.push({
      user: 'SmartBot',
      text: data.name + ' has left.'
    });

    var i, user;
    for (i = 0; i < $scope.users.length; i++) {
      user = $scope.users[i];
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });

  $scope.messages = [];

  $scope.sendMessage = function ( ) {  
    var msg = $scope.message;
    pushMessage(msg);

    // clear message box for new user input
    $scope.message = '';
  }; 

  function pushMessage(text){
    // broadcast
    socket.emit('send:message', {
      message: text
    });

    // add locally
    $scope.messages.push({
      user: $scope.name,
      text: text
    });
  }

	$scope.checkPreviousEntry = function(first, index){
		if(first){
			return true;
		}
		return ($scope.messages[index-1].user != $scope.messages[index].user);
	}

}

app.controller('AppCtrl', AppCtrl);
