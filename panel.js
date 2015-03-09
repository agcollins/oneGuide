var app = angular.module('panelModule', ['ui.bootstrap', 'ngCookies']);

app.controller('PanelController', ['$cookies', '$modal', function($cookies, $modal){
	//look for cookie
	//NOTE: this behavior is deprecated. In newer angular, cookies use .get and .put functions, but we are using
	//1.3.14, which doesn't have this yet.
	var playersCookie = $cookies.oneGuide_players;

	if(playersCookie == undefined){
		var playersCookieObj = {"selected": [], "allSelected": false, "players": []};
		var jsonplayers = JSON.stringify(playersCookieObj);
		$cookies.oneGuide_players = JSON.stringify(playersCookieObj);
	}
	playersCookie = JSON.parse($cookies.oneGuide_players);

	this.players = playersCookie.players;	
	this.allSelected = playersCookie.allSelected;
	this.selected = playersCookie.selected;
	this.select = function(name){
		if(!name || (name === 'all' && !this.allSelected)){
			this.selected=[]; //this is to prevent cases where a player is selected then added into the list again when the 'all' button is pushed. I don't know if this would cause any bugs, but I'm just doing this to be safe.

			for(p in this.players){
				this.selected.push(this.players[p]); //select all players if no parameter is passed or if 'all' is clicked
			}

			this.allSelected = true;
			playersCookie.allSelected = true;
			playersCookie.selected = this.selected;
			$cookies.oneGuide_players = JSON.stringify(playersCookie);
		}

		else if(name === 'all' && this.allSelected){
			this.selected = [];
			this.allSelected = false;
			playersCookie.allSelected = false;
			playersCookie.selected = [];
			$cookies.oneGuide_players = JSON.stringify(playersCookie);
		}

		else { //name isn't 'all'
			this.allSelected = false;
			playersCookie.allSelected = false;
			if(this.selected.indexOf(name)>-1){
				this.selected.splice(this.selected.indexOf(name), 1); //remove at index of name
				playersCookie.selected = this.selected;
			}
			else{
				this.selected.push(name);
				playersCookie.selected = this.selected;
			}
			$cookies.oneGuide_players = JSON.stringify(playersCookie);
		}
	};
	this.isSelected = function(name){
		if(!name)
			return false;
		else if(name === 'all')
			return this.allSelected;
		else {
			return (this.selected.indexOf(name)>-1); //do we need parentheses? 
		}
	};

	//the following sets up the add player modal
	panel = this;
	this.openModal = function() {
		var addPlayerModal = $modal.open({
			templateUrl: 'addPlayerModal.html',
				controller: 'AddPlayerController as addPlayer',
				size: 'lg',
				//here we pass the modal the current players
				resolve: {
					players: function() {
						//slice because we want a copy
						return panel.players.slice();
					}
				}
		});

		//this is triggered when this modal goes away
		addPlayerModal.result.then(function (newPlayers) {
			//on 'save' we update the new list of players
			panel.players = newPlayers;
			playersCookie.players = panel.players;
			$cookies.oneGuide_players = JSON.stringify(playersCookie);
		}, function (){
			//on dismiss we do nothing
		});
	};
}]);

app.factory('selectedPlayers', function(){
	return {
		players: app.controller('PanelController').players,
		selected: app.controller('PanelController').selected
	};
});

//this is what actually controls the modal
//we get 'players' because we passed it using the resolve key in the above $modal.open function
angular.module('panelModule').controller('AddPlayerController', function($http, $modalInstance, players) {
	modalController = this;
	modalController.players = players;
	modalController.summonerName = undefined;
	modalController.alertClasses = 
{'alert-danger': false,
	'alert': true};
	modalController.alertMsg = "Player added!";
	modalController.submitted = false;

	modalController.attemptAdd = function () {
		var currPlayers = modalController.players;
		var inputedName = modalController.summonerName;
		console.log(currPlayers);
		var index = currPlayers.indexOf(inputedName);
		//already in list?
		if(index > -1){
			modalController.alertMsg = "You are already tracking summoner " + inputedName;
			modalController.alertClasses['alert-danger'] = true;
			modalController.submitted = true;
		}
		else{    
			$http.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + modalController.summonerName
					+ "?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").
				success(function(data){
					modalController.players.push(modalController.summonerName);
					modalController.submitted = false;
					modalController.summonerName = undefined;
				}).
			//summoner not found
			error(function(data){
				modalController.alertMsg = "We couldn't find the summoner " + modalController.summonerName;
				modalController.alertClasses['alert-success'] = false;
				modalController.alertClasses['alert-danger'] = true;
				modalController.submitted = true;
			});
		}
	};

modalController.remove = function(player) {
	var playerIndex = modalController.players.indexOf(player);
	console.log(playerIndex);
	modalController.players.splice(playerIndex, 1);
};

modalController.save = function () {
	$modalInstance.close(modalController.players);
};

modalController.cancel = function () {
	$modalInstance.dismiss('cancel');
};
});
