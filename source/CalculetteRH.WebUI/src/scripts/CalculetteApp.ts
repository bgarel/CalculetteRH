module CalculetteRH {
	"use strict";

	angular.module("calculetteApp", ["ngRoute"])
		.constant("moment", moment)
		.controller("AncienneteController", AncienneteController)
		.config(['$routeProvider', configRoute]);

	
	function configRoute($routeProvider: ng.route.IRouteProvider) {
			$routeProvider.
				when('/anciennete', {
					templateUrl: 'partials/_anciennete.html',
					controller: 'AncienneteController',
					controllerAs: 'vm'
				}).
				when('/conversionMinCent', {
					templateUrl: 'partials/_conversionMinCent.html',
					controller: 'ConversionMinCentController',
					controllerAs: 'vm'
				}).
				otherwise({
				redirectTo: '/'
			});
	}

}