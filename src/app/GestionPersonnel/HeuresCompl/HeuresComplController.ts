module CalculetteRH {

	'use strict';

	export class HeuresComplController {
		
		private tempsContrat: number = 35;
		private tempsTotal: number;
		private heuresMaj25: number;
		private heuresMaj10: number;
		private heuresRC: number;
		private isInputValid: boolean = false;		
            private is35hDepasse: boolean = false;
		
		constructor() {
		}

		doCalcul() {
		      if (isNaN(this.tempsContrat) || isNaN(this.tempsTotal)) {
                        this.isInputValid = false;
                        this.heuresMaj25 = 0;
                        this.heuresMaj10 = 0;
                        return;
                  }
                  this.isInputValid = true;
                  this.is35hDepasse = (this.tempsContrat < 35 && this.tempsTotal > 35);
                  //=SI(B1 < 35;MIN(B1 * 10 %;B3 - B1); 0)			
                  if (this.tempsContrat < 35 && this.tempsTotal > this.tempsContrat) {
                        this.heuresMaj10 = Math.min(this.tempsContrat * 0.1, this.tempsTotal - this.tempsContrat);
                  }
                  else {
                        this.heuresMaj10 = 0;
                  }
                  //=SI(B3>B1+B1*10%;35-B1-B6;0)
                  if (this.tempsTotal > (this.tempsContrat * 1.1)) {
                        this.heuresMaj25 = Math.max(0, 35 - this.tempsContrat - this.heuresMaj10);
                  }
                  else {
                        this.heuresMaj25 = 0;
                  }
		}				
	}
}