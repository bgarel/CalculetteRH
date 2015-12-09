module CalculetteRH {

	'use strict';

	export class IndemLicController {
		
		public dateEntreeStr: string;
		public dateSortieStr: string;
		
		public moisN1: string;
		public moisN2: string;
		public moisN3: string;
		public moisN4: string;
		public moisN5: string;
		public moisN6: string;
		public moisN7: string;
		public moisN8: string;
		public moisN9: string;
		public moisN10: string;
		public moisN11: string;
		public moisN12: string;
		
		public salaireN1: number;
		public salaireN2: number;
		public salaireN3: number;
		public salaireN4: number;
		public salaireN5: number;
		public salaireN6: number;
		public salaireN7: number;
		public salaireN8: number;
		public salaireN9: number;
		public salaireN10: number;
		public salaireN11: number;
		public salaireN12: number;
		
		public isIndemniteValid: boolean;
		public salaireMoyen: number;
		public montant15: number;
		public montant25: number;
		public montantIndemnite: number;
		
		public static $inject = [
			'moment'			
		];
	
		constructor(private moment: moment.MomentStatic) {
			this.isIndemniteValid = false;
		}
		
		public updateIndemnite() {
			
			var dateEntree = moment(this.dateEntreeStr, 'DD/MM/YYYY');
			var dateFin = moment(this.dateSortieStr, 'DD/MM/YYYY');
			
			if (!dateEntree.isValid() || !dateFin.isValid()
				|| dateFin.diff(dateEntree, 'year') > 200
				|| dateFin.diff(dateEntree, 'year') < 0) {
				this.isIndemniteValid = false;
				return;
			}			
			this.isIndemniteValid = true;
			
			let dateTemp = dateFin.clone();
			this.moisN1 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN2 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN3 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN4 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN5 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN6 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN7 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN8 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN9 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN10 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN11 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
			this.moisN12 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');			
						
			let anciennete = dateFin.add(1, 'day').diff(dateEntree, 'year', true);
			console.log('anciennete:' + anciennete);
			let salaireMoy3Mois = (+this.salaireN1 + (+this.salaireN2) + (+this.salaireN3)) / 3;
			let salaireMoy12Mois = (+this.salaireN1 + (+this.salaireN2) + (+this.salaireN3) + (+this.salaireN4) + (+this.salaireN5) + (+this.salaireN6)
									+ (+this.salaireN7) + (+this.salaireN8) + (+this.salaireN9) + (+this.salaireN10) + (+this.salaireN11) + (+this.salaireN12)) / 12;
			
			this.salaireMoyen = Math.max(salaireMoy3Mois, salaireMoy12Mois);
			this.montant15 = this.salaireMoyen * anciennete / 5;
			this.montant25 = Math.max(0, this.salaireMoyen * (anciennete - 10) * 2 / 15);					
			this.montantIndemnite = this.montant15 + this.montant25;
		}
	}
}