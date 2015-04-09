var app = angular.module("buildModule", []);

app.controller("BuildController", ['$http', 'playerFactory', function ($http, playerFactory) {
    
    var controller = this;
    controller.champions = [];
    controller.champNames = [];
    controller.proBuild = [];
    controller.builds = {};

    function getQueryStringValue(key) {
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    controller.selectedID = getQueryStringValue("champion");

    $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=43e187ef-e56e-4f24-bd58-1dbdc841abff").success(function (data) {
        var key, champs = data.data;
        for (key in champs) {
            if (champs[key].id == controller.selectedID) {
                controller.selectedChampion = champs[key];
                controller.selectedChampion.squareimg = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + key + ".png";
                controller.selectedChampion.loadingimg = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + key + "_0.jpg";
            }
            controller.champions.push(champs[key]);
            controller.champNames.push(champs[key].name);
        }
    });

}]);