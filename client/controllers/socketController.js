myApp.controller('socketController', function ($scope, socketFactory) {
    var name = window.prompt('Enter your name');
    console.log(name);
    var welcomeTitle = angular.element(document.getElementById('welcomeTitle'));
    welcomeTitle.append("Welcome " + name + "!");

    socketFactory.emit('loggingIn', {user: name});

    socketFactory.on("new_user", function(data) {
        console.log(data.message);
        var status = angular.element(document.getElementById('status'));
        status.append(data.message + '<br>').show();
    });

    // socketFactory.on('serverMessage', function (data) {
    //     console.log(data.msg);
    // });


    // grab all form data
    $scope.submitMessage = function (event) {
        event.preventDefault();
        data = {
            message: $('#msg').val(),
            name: name
        };
        socketFactory.emit("new_message", {message: data});
        return false;
    };

    socketFactory.on('messages', function (data) {
        console.log(data);
        var htmlContent = '';
        for (var i = 0; i < data.length; i++) {
            htmlContent += data[i].message.name + " : " + data[i].message.message + "<span class='right'>"+data[i].created_at+"</span>"+ '<br>';
        }
        $('.container').html(htmlContent);
    });

    socketFactory.on('loggedOut', function (data) {
        console.log(data.name);
        $('#status').html(data.name + '<br>').show();
    });

});