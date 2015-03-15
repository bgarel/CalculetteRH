module CalculetteRH {
	"use strict";

	angular.module("calculetteApp", ["ngRoute"])
		.constant("moment", moment)
		.controller("AncienneteController", AncienneteController)
		.controller("ConversionMinCentController", ConversionMinCentController)
		.controller("HeuresSupController", HeuresSupController)
		.controller("HeuresComplController", HeuresComplController)
		.config(['$routeProvider', configRoute]);

	
	function configRoute($routeProvider: ng.route.IRouteProvider) {
			$routeProvider.
				when('/anciennete', {
					templateUrl: 'Partials/_anciennete.html',
					controller: 'AncienneteController',
					controllerAs: 'vm'
				}).
				when('/conversionMinCent', {
					templateUrl: 'Partials/_conversionMinCent.html',
					controller: 'ConversionMinCentController',
					controllerAs: 'vm'
				}).
				when('/heuresSup', {
					templateUrl: 'Partials/_heuresSup.html',
					controller: 'HeuresSupController',
					controllerAs: 'vm'
				}).
				when('/heuresCompl', {
					templateUrl: 'Partials/_heuresCompl.html',
					controller: 'HeuresComplController',
					controllerAs: 'vm'
				}).
				otherwise({
				redirectTo: '/'
			});
	}

}