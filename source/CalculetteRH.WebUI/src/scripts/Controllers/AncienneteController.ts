module CalculetteRH {

	'use strict';

	export class AncienneteController {
			
		dateEntreeStr: string;
		dateFinStr: string;
		anciennete: string;
		nbreAnnee: number;
				
					
		public static $inject = [
			'$scope'			
		];
				
		constructor(private $scope: ng.IScope) {
			var dateFin = new Date();
			this.dateFinStr = dateFin.toLocaleDateString();
		}

		updateAnciennete() {
			console.log(this.dateEntreeStr);
			console.log(this.dateFinStr);
		} 
	}
}