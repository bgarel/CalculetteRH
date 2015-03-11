var CalculetteRH;
(function (CalculetteRH) {
    "use strict";
    angular.module("calculetteApp", ["ngRoute"]).controller("AncienneteController", CalculetteRH.AncienneteController).config(['$routeProvider', configRoute]);
    function configRoute($routeProvider) {
        $routeProvider.when('/anciennete', {
            templateUrl: 'partials/_anciennete.html',
            controller: 'AncienneteController'
        }).otherwise({
            redirectTo: '/'
        });
    }
})(CalculetteRH || (CalculetteRH = {}));
