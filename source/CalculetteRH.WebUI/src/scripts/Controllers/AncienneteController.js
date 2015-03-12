var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var AncienneteController = (function () {
        function AncienneteController($scope) {
            this.$scope = $scope;
            var dateFin = new Date();
            this.dateFinStr = dateFin.toLocaleDateString();
        }
        AncienneteController.prototype.updateAnciennete = function () {
            console.log(this.dateEntreeStr);
            console.log(this.dateFinStr);
        };
        AncienneteController.$inject = [
            '$scope'
        ];
        return AncienneteController;
    })();
    CalculetteRH.AncienneteController = AncienneteController;
})(CalculetteRH || (CalculetteRH = {}));
