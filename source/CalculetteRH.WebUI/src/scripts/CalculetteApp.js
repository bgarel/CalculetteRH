var CalculetteRH;
(function (CalculetteRH) {
    "use strict";
    angular.module("calculetteApp", ["ngRoute"]).constant("moment", moment).controller("AncienneteController", CalculetteRH.AncienneteController).controller("ConversionMinCentController", CalculetteRH.ConversionMinCentController).controller("HeuresSupController", CalculetteRH.HeuresSupController).controller("HeuresComplController", CalculetteRH.HeuresComplController).config(['$routeProvider', configRoute]);
    function configRoute($routeProvider) {
        $routeProvider.when('/anciennete', {
            templateUrl: 'Partials/_anciennete.html',
            controller: 'AncienneteController',
            controllerAs: 'vm'
        }).when('/conversionMinCent', {
            templateUrl: 'Partials/_conversionMinCent.html',
            controller: 'ConversionMinCentController',
            controllerAs: 'vm'
        }).when('/heuresSup', {
            templateUrl: 'Partials/_heuresSup.html',
            controller: 'HeuresSupController',
            controllerAs: 'vm'
        }).when('/heuresCompl', {
            templateUrl: 'Partials/_heuresCompl.html',
            controller: 'HeuresComplController',
            controllerAs: 'vm'
        }).otherwise({
            redirectTo: '/'
        });
    }
})(CalculetteRH || (CalculetteRH = {}));
