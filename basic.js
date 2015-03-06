//api key: 43e187ef-e56e-4f24-bd58-1dbdc841abff

var app = angular.module('oneGuideApp', ['ui.bootstrap','ChampionApp']);

app.controller("oneGuideController", function($scope, $http){
	$scope.selectedChamp = undefined;
	$scope.champions = [];
	$scope.champNames = [];

	$http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data){
		var champs = data["data"]
		for (var key in champs){
			$scope.champions.push(champs[key]);
			$scope.champNames.push(champs[key]["name"]);
		}
	});

	$http.get("https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff&freeToPlay=true").success(function(data){
		$scope.freeChamps = [];
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
			$scope.freeChamps.push(data);
			});
		});
	});
});
/*
$(document).ready(function(){
	$(".my-players > li").bind('click', function(e){
		if($(this).hasClass('all-players')){
			$(".my-players > li").removeClass("active");
			$(this).addClass("active");
		}
		else{
			$(".all-players").removeClass("active");
			$(this).addClass("active");
		}
	});
});
*/
