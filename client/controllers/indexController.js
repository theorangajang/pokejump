myApp.controller('indexController', function($scope, $location, userFactory, socketFactory){

    console.log('I am able to load my new indexController');
    //store the username into the factory
    userFactory.getloginuser(function(data){
        console.log(data);
        $scope.userinfo = data;
        console.log($scope.userinfo._id);
    });
    $scope.createUsername = function(){
        console.log('createUsername indexController', $scope.user);
        userFactory.addUser($scope.user, function(userlist){
        $scope.userlist = userlist;
    });

    $location.path('/select');

    };

    $scope.createMultipleUsername = function () {

    };

    $scope.createChatroom = function () {
        socketFactory.emit('createChatroom', $scope.user, function () {});
        socketFactory.on('connected', function (newData) {
            console.log(newData.message);
            $location.path('/chatroom');
        });

    };

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i < max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.chosenPokemon = function (pokemon) {
        $location.path('/game/'+pokemon);
    }

});
