var myApp = angular.module('myApp', ['ngRoute']).directive('loadScript', [function() {
	return function(scope, element, attrs) {
		angular.element('<script src="/pokemonjump/client/public/js/main.js"></script>').appendTo(element);
	}
}]);
// We instantiate our application and we inject ngrouter so that it's available
// and so that we can use it to set up our routes below.



// this is our router. You can choose to set your controllers on the partial
// but I prefer to set my controllers here because it's cleaner
(function(){
	myApp.config(function($routeProvider){
		$routeProvider
			.when('/',
			{
				controller: 'indexController',
				templateUrl: "partials/homepage.html"
			})
			.when('/game',{
				controller: 'gameController',
				templateUrl: "partials/game.html"
			})
			.when('/select',{
				//change the controller later when select page is fully built
				controller: 'indexController',
				templateUrl: "partials/select.html"
			})
	});
}());
