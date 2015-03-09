var app =	angular.module('accordionModule', ['ui.bootstrap']);

app.controller('AccController', ['selectedPlayers', function (selectedPlayers) {
	var players = selectedPlayers.players;
	var selected = selectedPlayers.selected;
	var group = [];

	console.log(players);
}]);
