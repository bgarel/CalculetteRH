var CalculetteRH;
(function (CalculetteRH) {
    "use strict";
    angular.module("calculetteApp", ["ngRoute"]).constant("moment", moment).controller("AncienneteController", CalculetteRH.AncienneteController).config(['$routeProvider', configRoute]);
    function configRoute($routeProvider) {
        $routeProvider.when('/anciennete', {
            templateUrl: 'partials/_anciennete.html',
            controller: 'AncienneteController',
            controllerAs: 'vm'
        }).otherwise({
            redirectTo: '/'
        });
    }
})(CalculetteRH || (CalculetteRH = {}));
