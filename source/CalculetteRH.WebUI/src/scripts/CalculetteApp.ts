module CalculetteRH {
	"use strict";

	angular.module("calculetteApp", ["ngRoute"])
		.controller("AncienneteController", AncienneteController)
		.config(['$routeProvider', configRoute]);

	
	function configRoute($routeProvider: ng.route.IRouteProvider) {
			$routeProvider.
				when('/anciennete', {
				templateUrl: 'partials/_anciennete.html',
				controller: 'AncienneteController',
				controllerAs: 'vm'
			}).
				otherwise({
				redirectTo: '/'
			});
	}

}