var app = angular.module("buildModule", []);

app.controller("BuildController", ['$location','$http', 'playerFactory', function ($location, $http, playerFactory) {

	var controller = this;
	controller.champions = [];
	controller.champNames = [];
	controller.proBuild = [];
	controller.builds = {};

	var getChampionID = function(){
		path = $location.path();
		path = path.substring(path.indexOf('champion/'));
		console.log(path);
		return path;
	};

	controller.selectedID = getChampionID();

	$http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function (data) {
		var key, champs = data.data;
		for (key in champs) {
			if (champs[key].id == controller.selectedID) {
				controller.selectedChampion = champs[key];
				controller.selectedChampion.squareimg = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + key + ".png";
				controller.selectedChampion.loadingimg = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + key + "_0.jpg";
			}
			controller.champions.push(champs[key]);
			controller.champNames.push(champs[key].name);
		}
	});

}]);
