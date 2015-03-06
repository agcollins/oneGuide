//api key: 43e187ef-e56e-4f24-bd58-1dbdc841abff
angular.module("oneGuideApp", ["ui.bootstrap"]);
angular.module("oneGuideApp").controller("oneGuideController", function($scope, $http){
    $scope.selectedChamp = undefined;
    $scope.champions = [];
    $scope.champNames = [];

    $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data) {
	var champs = data["data"]
	for (var key in champs){
	    $scope.champions.push(champs[key]);
	    $scope.champNames.push(champs[key]["name"]);
	}
    });

    $http.get("https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff&freeToPlay=true").success(function(data) {
	$scope.freeChamps = [];
	var freechampions = data["champions"];
	freechampions.forEach(function(champ){
	    $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champ["id"] + "?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data){
		var name = data.name;
		if(name === "Kha'Zix")
		    data.name = "Khazix";
		if(name === "Xin Zhao")
		    data.name = "XinZhao";
		data["imgsrc"] = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + data.name + "_0.jpg";
		var loc = window.location.pathname;
		var dir = loc.substring(0, loc.lastIndexOf('/'));
		data["href"] = dir + '/champion.html?champion=' + data.id;
		$scope.freeChamps.push(data);
	    });
	});
    });
});

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
