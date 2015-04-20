/*global angular, controller*/

var app = angular.module('playerModule', []);

app.factory('playerFactory', ['$scope', '$cookies', function ($scope, $cookies) {
	"use strict";

	var getChampionsWithImages, playersCookie, playersCookieObj, jsonplayers, data;
	playersCookie = JSON.parse($cookies.oneGuide_players);

	data = {};
	data.getAllChampions = getAllChampions;
	data.getChampionByID = getChampionByID;
	data.getChampionImageByName = getChampionImageByName; 
	data.getPlayerIDByName = getPlayerIDByName;
	data.getCookie = getCookie;

	getAllChampions = function () {
		return $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff");
	};

	getChampionByID = function(query){
		var url;
		url = 'http://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + query + '?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff';
		return $http.get(url);
	}

	getChampionImageByName = function(query) {
		var url;
		url = "https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + query + "?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff";
		return $http.get(url);
	}

	getCookie = function() {
		playersCookie = $cookies.oneGuide_players;

		if (playersCookie === undefined) {
		
			playersCookieObj = {"selected": [], "allSelected": false, "players": []};
			jsonplayers = JSON.stringify(playersCookieObj);	

			$cookies.oneGuide_players = jsonplayers;
			playersCookie = JSON.parse($cookies.oneGuide_players);
			
		}

		return playersCookie;
	}

	getPlayerIDByName = function(name) {
		var url;
		url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name + '?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff';
		return $http.get(url);
	}

	return {
		data: data
	};

	getItemImageUrl = function(){
		return 2;	
	};

}]);
