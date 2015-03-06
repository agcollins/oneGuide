//api key: 43e187ef-e56e-4f24-bd58-1dbdc841abff
angular.module("oneGuideApp", ["ui.bootstrap"]);
angular.module("oneGuideApp").controller("oneGuideController", function($scope, $http){
    $scope.champions = [];
    $scope.champNames = [];
    $scope.proBuild = [];


    function getQueryStringValue (key) {  
	return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  
    $scope.selectedID = getQueryStringValue("champion");

    $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data) {
	var champs = data["data"]
	for (var key in champs){
	    if(champs[key].id == $scope.selectedID){
		$scope.selectedChampion = champs[key];
		$scope.selectedChampion["squareimg"] = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + key + ".png";
		$scope.selectedChampion["loadingimg"] = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + key + "_0.jpg";
	    }
	    $scope.champions.push(champs[key]);
	    $scope.champNames.push(champs[key]["name"]);
	}
    });
 
    //dummy for now, automatically using Imaqtipie
    $http.get("https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/19887289/recent?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data) {
	var games = data.games;
	games.forEach(function(game){
	    if(game.championId == $scope.selectedID){
		for(var i = 0; i < 6; i++){
		    var stats = game.stats;
		    $scope.proBuild.push({"id": stats["item" + i], "imgsrc": "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/" 
					  + stats["item" + i] + ".png"});
		}
	    }
	});
    });
});

