var app = angular.module('panelModule', ['ui.bootstrap']);

app.controller('PanelController', function(){
	this.allSelected = false;
	//look for cookie
	this.players = [
		'TheOddOne','Imaqtpie','Bjergsen' //we need to read this from a json file
	];	
	
	this.selected = [];
	this.select = function(name){
		if(!name || (name === 'all' && !this.allSelected)){
			this.selected=[]; //this is to prevent cases where a player is selected then added into the list again when the 'all' button is pushed. I don't know if this would cause any bugs, but I'm just doing this to be safe.
			for(p in this.players){
				this.selected.push(this.players[p]); //select all players if no parameter is passed or if 'all' is clicked
			}

			this.allSelected = true;
		}

		else if(name === 'all' && this.allSelected){
			this.selected = [];
			this.allSelected = false;
		}

		else { //name isn't 'all'
			this.allSelected = false;	
			if(this.selected.indexOf(name)>-1){
				this.selected.splice(this.selected.indexOf(name), 1); //remove at index of name
			}
			else this.selected.push(name);

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
});
