module CalculetteRH {

	'use strict';

	export class IjssSalaireMenController {
			
		plafondSalaire: number = 2623.54;
		plafondIjss: number = 43.13;
		plafondIjssMaj: number = 57.50;
		
		dateDebutStr: string;
		dateFinStr: string;
		dateDernierJourStr: string;
		nbEnfantsStr: string;
		isIjssValid: boolean;
		
		dateCarenceDebut: Date;
		dateCarenceFin: Date;
		dateIjssDebut: Date;
		dateIjssFin: Date;
		ijssBrut: number;
		ijssNet: number;
		dateIjssMajDebut: Date;
		dateIjssMajFin: Date;
		ijssMajBrut: number;
		ijssMajNet: number;
		nbJoursArret: number;
		ijssTotalBrut: number;
		ijssTotalNet: number;
		
			
		public static $inject = [
			'moment'			
		];
				
		constructor(private moment: moment.MomentStatic) {
			var dateFin = moment();
			this.dateFinStr = dateFin.format('DD/MM/YYYY');
			this.isIjssValid = false;
		}

		updateIjss() {
			
			
			
		}

			
			
	}		
}