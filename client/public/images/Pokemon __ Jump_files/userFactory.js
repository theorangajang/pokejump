myApp.factory('userFactory', function($http){
  var factory = {};
  var userlist = {};

  factory.addUser = function(data, callback){
    console.log('made it to my user factory', data);
    $http.post('/users', data).then(function(data){
      console.log('make it back from backend this is our new user', data);
      userlist = data.data;
      callback(userlist);
    });
  };

  //get username by id
  factory.getUsername = function(userId, callback){
    $http.get('/user/'+userId).then(function(user){
      console.log('made it back from backend to this one user', user);
      callback(user);
    });
  };

  factory.getloginuser = function(callback){
    callback(userlist);
  };

  return factory;
});
