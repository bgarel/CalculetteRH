module CalculetteRH {

	'use strict';

	export class IjssSalaireMenController {
			
		plafondSalaire: number = 2639.92;
		plafondIjss: number = 43.40;
		plafondIjssMaj: number = 57.86;
		
		dateDebutStr: string;
		dateFinStr: string;		
		nbEnfants: number;
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
		showIjssMaj: boolean;
			
		public static $inject = [
			'moment'			
		];
				
		constructor(private moment: moment.MomentStatic) {
			//var dateFin = moment();
			//this.dateFinStr = dateFin.format('DD/MM/YYYY');
			this.isIjssValid = false;
			this.isDateDebutValid = false;
			this.showIjssMaj = false;
		}

		updateIjss() {			
			
			let dateDebut = moment(this.dateDebutStr, 'DD/MM/YYYY');
			let dateFin = moment(this.dateFinStr, 'DD/MM/YYYY');
			
			if (!dateDebut.isValid() || dateDebut.year() < 1000)	{
				this.isDateDebutValid = false;
				this.isIjssValid = false;
				return;
			}						
			this.isDateDebutValid = true;
			
			let dateTemp = dateDebut.clone();
			this.moisNmoins1 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisNmoins2 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisNmoins3 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');	
			
			if (!dateDebut.isValid() || !dateFin.isValid()
				|| dateFin.diff(dateDebut, 'day') < 3)	{				
				this.isIjssValid = false;
				return;
			}
			this.isIjssValid = true;
			
			//dateTemp = dateDebut.clone().add(1, 'day');			
			this.dateCarenceDebut = dateDebut;//moment.max([dateTemp, dateDebut]);
			this.dateCarenceFin = this.dateCarenceDebut.clone().add(2, 'day');
			this.dateIjssDebut = this.dateCarenceFin.clone().add(1, 'day');
						
			let minN3 = Math.min(this.salaireNMoins3, this.plafondSalaire);
			let minN2 = Math.min(this.salaireNMoins2, this.plafondSalaire);
			let minN1 = Math.min(this.salaireNMoins1, this.plafondSalaire);
			let moyenneBrut = (minN1 + minN2 + minN3) / 3 / (365/12) * 0.5;
			this.ijssBrut = Math.min(moyenneBrut, this.plafondIjss);
			this.ijssNet = 0.933 * this.ijssBrut;
			
			let nbJoursIjss = 0;
			let nbJoursIjssMaj = 0;
			
			if (this.nbEnfants) {
				if (this.nbEnfants < 3 || dateFin.diff(this.dateCarenceDebut, 'day') <= 29) {					
					this.showIjssMaj = false;
					this.dateIjssFin = dateFin;
					this.ijssMajBrut = 	0;
					this.ijssMajNet = 0;											
				} else if (this.nbEnfants >= 3) {
					this.showIjssMaj = true;
					let moyenneBrutMaj = (minN1 + minN2 + minN3) / 3 / (365/12) * 0.666;
					this.ijssMajBrut = 	Math.min(moyenneBrutMaj, this.plafondIjssMaj);
					this.ijssMajNet = 0.933 * this.ijssMajBrut;
					this.dateIjssFin = this.dateCarenceDebut.clone().add(29, 'day');
					this.dateIjssMajDebut = this.dateIjssFin.clone().add(1, 'day');
					this.dateIjssMajFin = dateFin;
					nbJoursIjssMaj = this.dateIjssMajFin.diff(this.dateIjssMajDebut, 'day') + 1;
				}
				nbJoursIjss = this.dateIjssFin.diff(this.dateIjssDebut, 'day') + 1;
				this.nbJoursArret = nbJoursIjss + nbJoursIjssMaj;
				this.ijssTotalBrut = nbJoursIjss * this.ijssBrut + nbJoursIjssMaj * this.ijssMajBrut;
				this.ijssTotalNet = nbJoursIjss * this.ijssNet + nbJoursIjssMaj * this.ijssMajNet;
			}
		}			
			
	}		
}