(function(){
    var app = angular.module("buildModule", []);
    app.controller("BuildController", ['$http', function($http){
	var controller = this;
	controller.champions = [];
	controller.champNames = [];
	controller.proBuild = [];

	function getQueryStringValue (key) {  
	    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
	}  

	controller.selectedID = getQueryStringValue("champion");

	$http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data){
	    var champs = data["data"]
	    for (var key in champs){
		if(champs[key].id == controller.selectedID){
		    controller.selectedChampion = champs[key];
		    controller.selectedChampion["squareimg"] = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + key + ".png";
		    controller.selectedChampion["loadingimg"] = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + key + "_0.jpg";
		}
		controller.champions.push(champs[key]);
		controller.champNames.push(champs[key]["name"]);
	    }
	});

	//dummy for now, automatically using Imaqtipie
	$http.get("https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/19887289/recent?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function(data) {
	    var games = data.games;
	    for(var i = 0; i < games.length; i++){
		game = games[i];
		if(game.championId == controller.selectedID){
		    var stats = game.stats;
		    for(var j = 1; j <= 6; j++){
			controller.proBuild.push({"id": stats["item" + j], 
						  "imgsrc": "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/" 
						  + stats["item" + j] + ".png"});
		    }
		    break;
		}
	    };
	});
    }]);
})();
