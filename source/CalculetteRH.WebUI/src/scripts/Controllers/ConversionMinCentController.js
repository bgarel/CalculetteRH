var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var ConversionMinCentController = (function () {
        function ConversionMinCentController() {
        }
        ConversionMinCentController.prototype.doConversion = function () {
            if (isNaN(this.heures) || isNaN(this.minutes) || parseInt(this.minutes) > 59) {
                this.heureMinutes = '';
                return;
            }
            this.heureMinutes = parseInt(this.heures) + (parseInt(this.minutes) / 60);
        };
        ConversionMinCentController.prototype.reverseConversion = function () {
            if (isNaN(this.heureMinutes)) {
                this.heures = '';
                this.minutes = '';
                return;
            }
            this.heures = Math.floor(this.heureMinutes);
            this.minutes = Math.floor((this.heureMinutes - this.heures) * 60);
        };
        return ConversionMinCentController;
    })();
    CalculetteRH.ConversionMinCentController = ConversionMinCentController;
})(CalculetteRH || (CalculetteRH = {}));
