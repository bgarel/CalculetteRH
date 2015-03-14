var CalculetteRH;
(function (CalculetteRH) {
    "use strict";
    angular.module("calculetteApp", ["ngRoute"]).constant("moment", moment).controller("AncienneteController", CalculetteRH.AncienneteController).controller("ConversionMinCentController", CalculetteRH.ConversionMinCentController).config(['$routeProvider', configRoute]);
    function configRoute($routeProvider) {
        $routeProvider.when('/anciennete', {
            templateUrl: 'Partials/_anciennete.html',
            controller: 'AncienneteController',
            controllerAs: 'vm'
        }).when('/conversionMinCent', {
            templateUrl: 'Partials/_conversionMinCent.html',
            controller: 'ConversionMinCentController',
            controllerAs: 'vm'
        }).otherwise({
            redirectTo: '/'
        });
    }
})(CalculetteRH || (CalculetteRH = {}));
