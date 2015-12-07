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
		isDateDebutValid: boolean;
		
		dateCarenceDebut: moment.Moment;
		dateCarenceFin: moment.Moment;
		dateIjssDebut: moment.Moment;
		dateIjssFin: moment.Moment;
		ijssBrut: number;
		ijssNet: number;
		dateIjssMajDebut: moment.Moment;
		dateIjssMajFin: moment.Moment;
		ijssMajBrut: number;
		ijssMajNet: number;
		nbJoursArret: number;
		ijssTotalBrut: number;
		ijssTotalNet: number;
		
		moisNmoins3: string;
		moisNmoins2: string;
		moisNmoins1: string;
		salaireNMoins3: number;
		salaireNMoins2: number;
		salaireNMoins1: number;
		
			
		public static $inject = [
			'moment'			
		];
				
		constructor(private moment: moment.MomentStatic) {
			//var dateFin = moment();
			//this.dateFinStr = dateFin.format('DD/MM/YYYY');
			this.isIjssValid = false;
			this.isDateDebutValid = false;
		}

		updateIjss() {			
			let dateDernierJour = moment(this.dateDernierJourStr, 'DD/MM/YYYY');
			let dateDebut = moment(this.dateDebutStr, 'DD/MM/YYYY');
			let dateFin = moment(this.dateFinStr, 'DD/MM/YYYY');
			
			if (!dateDernierJour.isValid() || dateDernierJour.year() < 1000)	{
				this.isDateDebutValid = false;
				this.isIjssValid = false;
				return;
			}						
			this.isDateDebutValid = true;
			
			let dateTemp = dateDernierJour.clone();
			this.moisNmoins1 = dateTemp.add('month', -1).locale('fr').format('MMMM YYYY');
			this.moisNmoins2 = dateTemp.add('month', -1).locale('fr').format('MMMM YYYY');
			this.moisNmoins3 = dateTemp.add('month', -1).locale('fr').format('MMMM YYYY');	
			
			if (!dateDebut.isValid() || !dateFin.isValid()
				|| dateDebut > dateFin)	{				
				this.isIjssValid = false;
				return;
			}
			this.isIjssValid = true;
			
			dateTemp = dateDernierJour.clone().add('day', 1);			
			this.dateCarenceDebut = moment.max([dateTemp, dateDebut]);
			this.dateCarenceFin = this.dateCarenceDebut.clone().add('day', 2);
			this.dateIjssDebut = this.dateCarenceFin.clone().add('day', 1);
			this.dateIjssFin = dateFin;
			// MIN(((MIN(E16;E3)+MIN(E17;E3)+MIN(E18;E3))/3/30,42*50%);E4)
			let minN3 = Math.min(this.salaireNMoins3, this.plafondSalaire);
			let minN2 = Math.min(this.salaireNMoins2, this.plafondSalaire);
			let minN1 = Math.min(this.salaireNMoins1, this.plafondSalaire);
			let moyenneBrut = (minN1 + minN2 + minN3) / 3 / (365/12) * 0.5;
			this.ijssBrut = Math.min(moyenneBrut, this.plafondIjss);
			this.ijssNet = 0.933 * this.ijssBrut;
						
			
		}

			
			
	}		
}