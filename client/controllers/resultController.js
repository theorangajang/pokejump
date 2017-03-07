myApp.controller('resultController', function($scope, userFactory){
  userFactory.getloginuser(function(data){
      console.log(data);
      $scope.userinfo = data;
      console.log($scope.userinfo);
  });
  userFactory.getUser($scope.userinfo._id, function(data){
    console.log('result controller', data);
    $scope.user = data.data;
  })
});
