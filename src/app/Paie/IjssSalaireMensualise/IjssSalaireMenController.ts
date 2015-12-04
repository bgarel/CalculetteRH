module CalculetteRH {

	'use strict';

	export class IjssSalaireMenController {
			
		dateDebutStr: string;
		dateFinStr: string;
		dateDernierJourStr: string;
		nbEnfantsStr: string;
		isIjssValid: boolean;
						
					
		public static $inject = [
			'moment'			
		];
				
		constructor(private moment: moment.MomentStatic) {
			var dateFin = moment();
			this.dateFinStr = dateFin.format('DD/MM/YYYY');
			this.isIjssValid = false;
		}

		updateIjss() {}

			
			
	}		
}