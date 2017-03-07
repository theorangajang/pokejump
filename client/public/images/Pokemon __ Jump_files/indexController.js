myApp.controller('indexController', function($scope, $location, userFactory, userChoiceFactory){

    console.log('I am able to load my new indexController');
    //store the username into the factory
    userFactory.getloginuser(function(data){
        $scope.userinfo = data;
    });
    $scope.createUsername= function(){
        console.log('createUsername indexController', $scope.user);
        userFactory.addUser($scope.user, function(userlist){
        $scope.userlist = userlist;
    });

    $location.path('/select');

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
        userChoiceFactory.setChosenPokemon(pokemon);
    }

});
