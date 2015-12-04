/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="_references.ts" />

module CalculetteRH {
	"use strict";

	angular.module("calculetteApp", ["ngRoute"])
		.constant("moment", moment)
		.controller("AncienneteController", AncienneteController)
		.controller("ConversionMinCentController", ConversionMinCentController)
		.controller("HeuresSupController", HeuresSupController)
		.controller("HeuresComplController", HeuresComplController)
		.controller("IjssSalaireMenController", IjssSalaireMenController)
		.config(['$routeProvider', configRoute]);

	
	function configRoute($routeProvider: ng.route.IRouteProvider) {
			 $routeProvider
			 	.when('/', {
            		templateUrl: 'app/accueil.html'
			 	}).
				when('/anciennete', {
					templateUrl: 'app/GestionPersonnel/Anciennete/anciennete.html',
					controller: 'AncienneteController',
					controllerAs: 'vm'
				}).
				when('/conversionMinCent', {
					templateUrl: 'app/GestionPersonnel/ConversionMinCent/conversionMinCent.html',
					controller: 'ConversionMinCentController',
					controllerAs: 'vm'
				}).
				when('/heuresSup', {
					templateUrl: 'app/GestionPersonnel/HeuresSup/heuresSup.html',
					controller: 'HeuresSupController',
					controllerAs: 'vm'
				}).
				when('/heuresCompl', {
					templateUrl: 'app/GestionPersonnel/HeuresCompl/heuresCompl.html',
					controller: 'HeuresComplController',
					controllerAs: 'vm'
				}).
				when('/IjssSalaireMensualise', {
					templateUrl: 'app/Paie/IjssSalaireMensualise/ijssSalaireMen.html',
					controller: 'IjssSalaireMenController',
					controllerAs: 'vm'
				}).
				otherwise({
				redirectTo: '/'
			});
	}

}