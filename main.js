var app = angular.module('mainApp', ['ui.bootstrap', 'mainControllers', 'ngRoute']);

angular.module('mainControllers', ['carouselModule', 'searchModule']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'routes/welcome.html'	
	})
	.otherwise({
		redirectTo: '/welcome'	
	});
}]);
