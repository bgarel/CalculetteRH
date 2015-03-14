var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var ConverionMinCent = (function () {
        function ConverionMinCent(moment) {
            this.moment = moment;
        }
        ConverionMinCent.$inject = [
            'moment'
        ];
        return ConverionMinCent;
    })();
    CalculetteRH.ConverionMinCent = ConverionMinCent;
})(CalculetteRH || (CalculetteRH = {}));
