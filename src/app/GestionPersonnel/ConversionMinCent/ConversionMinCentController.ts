module CalculetteRH {

	'use strict';

	export class ConversionMinCentController {
		
		private heures: any;
		private minutes: any;
		private heureMinutes: any;
		
		constructor() {		
		}

		doConversion() {
			if (isNaN(this.heures) || isNaN(this.minutes)
				|| parseInt(this.minutes) > 59) {
				this.heureMinutes = '';
				return;
			}			
			this.heureMinutes = parseInt(this.heures) + (parseInt(this.minutes) / 60);
		}

		reverseConversion() {
			if (isNaN(this.heureMinutes)) {
				this.heures = '';
				this.minutes = '';
				return;
			}
			this.heures = Math.floor(this.heureMinutes);
			this.minutes = Math.floor((this.heureMinutes - this.heures) * 60);
		}
	}
}