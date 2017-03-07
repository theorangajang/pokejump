myApp.factory('userFactory', function($http){
  var factory = {};
  var userlist = {};
  var topplayers = [];
  factory.addUser = function(data, callback){
    console.log('made it to my user factory', data);
    $http.post('/users', data).then(function(data){
      console.log('make it back from backend this is our new user', data);
      userlist = data.data;
      callback(userlist);
    });
  };

  //get username by id
  factory.getUser = function(userId, callback){
    $http.get('/user/'+userId).then(function(user){
      console.log('made it back from backend to this one user', user);
      callback(user);
    });
  };

  factory.getloginuser = function(callback){
    callback(userlist);
  };

  factory.updatePlayer = function(playerinfo, callback){
    $http.post('/user/'+playerinfo._id+'/update', playerinfo).then(function(data){
      console.log('made it back from backend this one friend', data.data);
      userlist = data.data;
      callback(data.data);
    });
  };

  factory.getTopPlayers = function(callback){
      console.log('made it to user factory get top ten players');
      $http.get('/user').then(function(players){
        console.log('made it back from backend this all top players', players);
        topplayers = players.data;
        callback(topplayers);
      })
  };

  return factory;
});
