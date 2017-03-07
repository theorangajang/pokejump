myApp.controller('gameController', function($scope, $routeParams,$location,userFactory,userChoiceFactory){
	var time;
  var routeParameter = $routeParams.id;

		userFactory.getloginuser(function(data){
				console.log(data);
				$scope.userinfo = data;
				console.log($scope.userinfo);
		});

    $scope.load = function init(){
        initLevel(); //INITIALIZE THE LEVEL STRUCTURE
        initPlayer(routeParameter); //INITIALIZE THE PLAYER
        initControll(); //INITIALIZE CONTROLLS

        $scope.game();//START RENDER
    };


		userFactory.getTopPlayers(function(data){
			console.log('this is data in game controller get top players', data);
			$scope.topplayers = data;
			console.log($scope.topplayers);
		});


    $scope.game = function render(){
        var now = new Date().getTime(), //GET CURRENT TIME
            dt = now - (time || now); //FRAME TIME
        time = now;

        updateLevel(dt); //UPDATE LEVEL
        var player = updatePlayer(dt);  //UPDATE PLAYER
        if (!player.live){
            console.log(player.score);
                var playerinfo = {_id: $scope.userinfo._id, name: $scope.userinfo.name, score: Math.round(player.score)};
                userFactory.updatePlayer(playerinfo, function(data){
                    $location.path('/result');
                });
            $scope.dead();
        }else{
            requestAnimationFrame(render);
            //CONTINUE RENDER
        }
        // score = getPlayerScore();
        console.log('in gamecontroller');
    };

    $scope.load();
    $scope.dead = function result(){
        $location.path('/result');
    };

});
