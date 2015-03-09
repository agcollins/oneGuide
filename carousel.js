(function(){
	var app = angular.module('carouselModule', []);

	app.controller("CarController", ['$http', function($http){
		var controller = this;
		this.freeChamps = [];

		$http.get("https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff&freeToPlay=true").success(function(data){
			var freechampions = data["champions"];

			freechampions.forEach(function(champ){
				$http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champ["id"] + "?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data){
					var name = data.key;
					data["imgsrc"] = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + name + "_0.jpg";
					var loc = window.location.pathname;
					var dir = loc.substring(0, loc.lastIndexOf('/'));
					data["href"] = dir + '/champion.html?champion=' + data.id;
					controller.freeChamps.push(data);
				});
			});
		});
	}]);
})();
