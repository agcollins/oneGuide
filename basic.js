angular.module("oneGuideApp", ["ui.bootstrap"]);
angular.module("oneGuideApp").controller("oneGuideController", function($scope){
    $scope.selectedChamp = undefined;

    jQuery.getJSON('lolChamps.json', function(champs){
	$scope.champions = champs;
	$scope.champNames = [];
	champs.forEach(function(champ){
	    $scope.champNames.push(champ['name']);
	});
    });

});

$(document).ready(function(){
    $(".my-players > li").bind('click', function(e){
	var players = $(".my-players > li").removeClass("active");
	$(this).addClass("active");
    });
});
