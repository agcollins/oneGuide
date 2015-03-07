(function(){
	var app = angular.module('searchModule', []);
	app.controller('SearchController', ['$http', function($http){
		var controller = this;
		this.selectedChamp = undefined;
		this.champions = [];
		this.champNames = [];

		$http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data){
			var champs = data["data"]
			for (var key in champs){
				controller.champions.push(champs[key]);
				controller.champNames.push(champs[key]["name"]);
			}
		});
	}]);
})();

