var app = angular.module('panelModule', ['ui.bootstrap', 'ngCookies']);

app.controller('PanelController', ['$cookies', function($cookies){
    //look for cookie
    //NOTE: this behavior is deprecated. In newer angular, cookies use .get and .put functions, but we are using
    //1.3.14, which doesn't have this yet.
    var playersCookie = $cookies.oneGuide_players;

    if(playersCookie == undefined){
	var playersCookieObj = {"selected": [], "allSelected": false, "players": ["TheOddOne", "Imaqtipie", "Bjergsen"]};
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
}]);
