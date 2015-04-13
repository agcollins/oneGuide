var app = angular.module('mainApp', ['ui.bootstrap', 'mainControllers', 'ngRoute']);

angular.module('mainControllers', ['carouselModule', 'searchModule']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'routes/welcome.html'	
	})
	.when('/champion', {
		templateUrl: 'routes/champion.html'	
	})	
	.when('', {
		redirectTo: '/welcome'
	})
	.otherwise({
		redirectTo: '/welcome'
	});
}]);
