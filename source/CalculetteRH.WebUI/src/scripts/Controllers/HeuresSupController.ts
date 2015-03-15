module CalculetteRH {

	'use strict';

	export class HeuresSupController {
		
		private tempsContrat: number = 35;
		private tempsTotal: number;
		private heuresMaj25: number;
		private heuresMaj50: number;
		private heuresRC: number;
		private isInputValid: boolean = false;
		
		constructor() {		

		}

		doCalcul() {
			if (isNaN(this.tempsContrat) || isNaN(this.tempsTotal)) {
				this.isInputValid = false;
				this.heuresMaj25 = 0;
				this.heuresMaj50 = 0;
				this.heuresRC = 0;
				return;
			}	
			this.isInputValid = true;	
			//=SI(B1>=35;MIN(B3-B1;43-B1);0)
			//=SI(B1 >= 35;MAX(0;B3 - B1 - B7); 0)
			//=SI(B1 >= 35;MAX(0;(B3 - 41) / 2); 0)
			if (this.tempsContrat >= 35 && this.tempsTotal >= this.tempsContrat) {
				this.heuresMaj25 = Math.min(this.tempsTotal - this.tempsContrat, 43 - this.tempsContrat);
				this.heuresMaj50 = Math.max(0, this.tempsTotal - this.tempsContrat - this.heuresMaj25);
				this.heuresRC = Math.max(0,(this.tempsTotal - 41) / 2);
			}
			else {
				this.heuresMaj25 = 0;
				this.heuresMaj50 = 0;
				this.heuresRC = 0;
			}
		}				
	}
}