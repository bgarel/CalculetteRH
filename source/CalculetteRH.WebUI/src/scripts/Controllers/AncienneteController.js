var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var AncienneteController = (function () {
        function AncienneteController($scope) {
            this.$scope = $scope;
        }
        AncienneteController.$inject = [
            '$scope'
        ];
        return AncienneteController;
    })();
    CalculetteRH.AncienneteController = AncienneteController;
})(CalculetteRH || (CalculetteRH = {}));
