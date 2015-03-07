(function(){
	var app = angular.module('carouselModule', ['ui.bootstrap']);

	app.controller("CarouselController", ['$scope','$http', function($scope, $http){
		var controller = this;
		controller.freeChamps = [];

		$http.get("https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff&freeToPlay=true").success(function(data){
			var freechampions = data["champions"];

			freechampions.forEach(function(champ){
				$http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champ["id"] + "?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data){
					var name = data.name;
					//this part is gross lol
					if(name === "Kha'Zix")
						name = "Khazix";
					if(name === "Xin Zhao")
						name = "XinZhao";
					data["imgsrc"] = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + name + "_0.jpg";
					var loc = window.location.pathname;
					var dir = loc.substring(0, loc.lastIndexOf('/'));
					data["href"] = dir + '/champion.html?champion=' + data.id;
					controller.freeChamps.push(data);
					console.log(controller.freeChamps);
				});
			});
		});
	}]);
})();
