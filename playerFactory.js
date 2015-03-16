var app = angular.module('playerModule', []);

app.factory('playerFactory', function ($scope, $http, $cookies) {
    
    var getChampionsWithImages, playersCookie, playersCookieObj, jsonplayers, data;
    playersCookie = JSON.parse($cookies.oneGuide_players);
   
	if (playersCookie === undefined) {
    
        playersCookieObj = {"selected": [], "allSelected": false, "players": []};
		jsonplayers = JSON.stringify(playersCookieObj);
        
		$cookies.oneGuide_players = jsonplayers;
        playersCookie = JSON.parse($cookies.oneGuide_players);
        
	}
    
    data = {};
	data.players = playersCookie.players;
	data.allSelected = playersCookie.allSelected;
	data.selected = playersCookie.selected;

    getChampionsWithImages = function () {
        
        $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function (data) {
            var champs = data.data, key;

            for (key in champs) {

                if (champs.hasOwnProperty(key)) {

                    if (champs[key].id === controller.selectedID) {

                        controller.selectedChampion = champs[key];
                        controller.selectedChampion.squareimg = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + key + ".png";
                        controller.selectedChampion.loadingimg = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + key + "_0.jpg";

                    }

                    controller.champions.push(champs[key]);
                    controller.champNames.push(champs[key].name);

                }

            }
        });
        
    };
    
    return {
        data: data,
        getChampions: getChampionsWithImages
    };
});