var app = angular.module('searchModule', []);
app.controller('SearchController', ['$http','$location', function($http, $location){
	var controller = this;
	this.selectedChamp = undefined;
	this.champions = {};
	this.champNames = [];
	this.championsFromApi = {};
	//controller.champions is an object that contains keys with champion name and corresponding values being their ids. Their names are the versions that should be used
	//controller.champNames is just an array that contains all of the champion names. 

	$http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data){
		var champs = data["data"]
			//champs is now an object that holds champion objects (contains champion id, champion name, description, etc.)
			for (var key in champs){
				controller.champions[key] = champs[key]["id"];
				controller.champNames.push(champs[key]["name"]);
			}
	});

	controller.isValidName = function(){
		var testName = controller.selectedChamp;
		var testList = controller.champNames;

		var index = testList.indexOf(testName);
		var validName = index > -1;
		return validName;
	}

	controller.loadBuild = function(){
		$location.path('/champion/' + controller.champions[controller.selectedChamp]);
	} 
}]);
