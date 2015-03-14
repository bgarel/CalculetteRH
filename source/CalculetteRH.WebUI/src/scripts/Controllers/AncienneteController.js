var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var AncienneteController = (function () {
        function AncienneteController(moment) {
            this.moment = moment;
            var dateFin = moment();
            this.dateFinStr = dateFin.format('DD/MM/YYYY');
            this.isDateValid = false;
        }
        AncienneteController.prototype.updateAnciennete = function () {
            var nbreJours = 0;
            var nbreAnnees = 0;
            var nbreMois = 0;
            var dateEntree = moment(this.dateEntreeStr, 'DD/MM/YYYY');
            var dateFin = moment(this.dateFinStr, 'DD/MM/YYYY');
            if (!dateEntree.isValid() || !dateFin.isValid()) {
                this.isDateValid = false;
                return;
            }
            this.isDateValid = true;
            nbreAnnees = dateFin.diff(dateEntree, 'year');
            nbreMois = dateFin.diff(dateEntree, 'month') - nbreAnnees * 12;
            if (dateEntree.date() <= dateFin.date()) {
                nbreJours = dateFin.date() - dateEntree.date();
            }
            else {
                var dateDebutInAnneeFin = moment({
                    year: dateFin.year(),
                    month: dateFin.month(),
                    day: dateEntree.date()
                }).subtract(1, 'month');
                nbreJours = dateFin.diff(dateDebutInAnneeFin, 'days');
            }
            this.anciennete = dateFin.diff(dateEntree, 'year', true);
            var chaineAnciennete = nbreAnnees + " an(s)";
            if (nbreMois > 0)
                chaineAnciennete += ", " + nbreMois + " mois";
            if (nbreJours > 0)
                chaineAnciennete += ", " + nbreJours + " jours";
            this.ancienneteStr = chaineAnciennete;
        };
        AncienneteController.$inject = [
            'moment'
        ];
        return AncienneteController;
    })();
    CalculetteRH.AncienneteController = AncienneteController;
})(CalculetteRH || (CalculetteRH = {}));
