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
            if (!dateEntree.isValid() || !dateFin.isValid()
                || dateFin.diff(dateEntree, 'year') > 200
                || dateFin.diff(dateEntree, 'year') < 0) {
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
var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var ConversionMinCentController = (function () {
        function ConversionMinCentController() {
        }
        ConversionMinCentController.prototype.doConversion = function () {
            if (isNaN(this.heures) || isNaN(this.minutes)
                || parseInt(this.minutes) > 59) {
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
var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var HeuresComplController = (function () {
        function HeuresComplController() {
            this.tempsContrat = 35;
            this.isInputValid = false;
            this.is35hDepasse = false;
        }
        HeuresComplController.prototype.doCalcul = function () {
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
        };
        return HeuresComplController;
    })();
    CalculetteRH.HeuresComplController = HeuresComplController;
})(CalculetteRH || (CalculetteRH = {}));
var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var HeuresSupController = (function () {
        function HeuresSupController() {
            this.tempsContrat = 35;
            this.isInputValid = false;
        }
        HeuresSupController.prototype.doCalcul = function () {
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
                this.heuresRC = Math.max(0, (this.tempsTotal - 41) / 2);
            }
            else {
                this.heuresMaj25 = 0;
                this.heuresMaj50 = 0;
                this.heuresRC = 0;
            }
        };
        return HeuresSupController;
    })();
    CalculetteRH.HeuresSupController = HeuresSupController;
})(CalculetteRH || (CalculetteRH = {}));
var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var IjssSalaireMenController = (function () {
        function IjssSalaireMenController(moment) {
            this.moment = moment;
            this.plafondSalaire = 2623.54;
            this.plafondIjss = 43.13;
            this.plafondIjssMaj = 57.50;
            //var dateFin = moment();
            //this.dateFinStr = dateFin.format('DD/MM/YYYY');
            this.isIjssValid = false;
            this.isDateDebutValid = false;
        }
        IjssSalaireMenController.prototype.updateIjss = function () {
            var dateDernierJour = moment(this.dateDernierJourStr, 'DD/MM/YYYY');
            var dateDebut = moment(this.dateDebutStr, 'DD/MM/YYYY');
            var dateFin = moment(this.dateFinStr, 'DD/MM/YYYY');
            if (!dateDernierJour.isValid() || dateDernierJour.year() < 1000) {
                this.isDateDebutValid = false;
                this.isIjssValid = false;
                return;
            }
            this.isDateDebutValid = true;
            var dateTemp = dateDernierJour.clone();
            this.moisNmoins1 = dateTemp.add('month', -1).locale('fr').format('MMMM YYYY');
            this.moisNmoins2 = dateTemp.add('month', -1).locale('fr').format('MMMM YYYY');
            this.moisNmoins3 = dateTemp.add('month', -1).locale('fr').format('MMMM YYYY');
            if (!dateDebut.isValid() || !dateFin.isValid()
                || dateDebut > dateFin) {
                this.isIjssValid = false;
                return;
            }
            this.isIjssValid = true;
            dateTemp = dateDernierJour.clone().add('day', 1);
            this.dateCarenceDebut = moment.max([dateTemp, dateDebut]);
            this.dateCarenceFin = this.dateCarenceDebut.clone().add('day', 2);
            this.dateIjssDebut = this.dateCarenceFin.clone().add('day', 1);
            this.dateIjssFin = dateFin;
            // MIN(((MIN(E16;E3)+MIN(E17;E3)+MIN(E18;E3))/3/30,42*50%);E4)
            var minN3 = Math.min(this.salaireNMoins3, this.plafondSalaire);
            var minN2 = Math.min(this.salaireNMoins2, this.plafondSalaire);
            var minN1 = Math.min(this.salaireNMoins1, this.plafondSalaire);
            var moyenneBrut = (minN1 + minN2 + minN3) / 3 / (365 / 12) * 0.5;
            this.ijssBrut = Math.min(moyenneBrut, this.plafondIjss);
            this.ijssNet = 0.933 * this.ijssBrut;
            this.nbJoursArret = this.dateIjssFin.diff(this.dateIjssDebut, 'day') + 1;
            this.ijssTotalBrut = this.nbJoursArret * this.ijssBrut;
            this.ijssTotalNet = this.nbJoursArret * this.ijssNet;
        };
        IjssSalaireMenController.$inject = [
            'moment'
        ];
        return IjssSalaireMenController;
    })();
    CalculetteRH.IjssSalaireMenController = IjssSalaireMenController;
})(CalculetteRH || (CalculetteRH = {}));
/// <reference path='./GestionPersonnel/Anciennete/AncienneteController.ts'/>
/// <reference path='./GestionPersonnel/ConversionMinCent/ConversionMinCentController.ts'/>
/// <reference path='./GestionPersonnel/HeuresCompl/HeuresComplController.ts'/>
/// <reference path='./GestionPersonnel/HeuresSup/HeuresSupController.ts'/>
/// <reference path='./Paie/IjssSalaireMensualise/IjssSalaireMenController.ts'/>
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="_references.ts" />
var CalculetteRH;
(function (CalculetteRH) {
    "use strict";
    angular.module("calculetteApp", ["ngRoute"])
        .constant("moment", moment)
        .controller("AncienneteController", CalculetteRH.AncienneteController)
        .controller("ConversionMinCentController", CalculetteRH.ConversionMinCentController)
        .controller("HeuresSupController", CalculetteRH.HeuresSupController)
        .controller("HeuresComplController", CalculetteRH.HeuresComplController)
        .controller("IjssSalaireMenController", CalculetteRH.IjssSalaireMenController)
        .config(['$routeProvider', configRoute]);
    function configRoute($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'app/accueil.html'
        }).
            when('/anciennete', {
            templateUrl: 'app/GestionPersonnel/Anciennete/anciennete.html',
            controller: 'AncienneteController',
            controllerAs: 'vm'
        }).
            when('/conversionMinCent', {
            templateUrl: 'app/GestionPersonnel/ConversionMinCent/conversionMinCent.html',
            controller: 'ConversionMinCentController',
            controllerAs: 'vm'
        }).
            when('/heuresSup', {
            templateUrl: 'app/GestionPersonnel/HeuresSup/heuresSup.html',
            controller: 'HeuresSupController',
            controllerAs: 'vm'
        }).
            when('/heuresCompl', {
            templateUrl: 'app/GestionPersonnel/HeuresCompl/heuresCompl.html',
            controller: 'HeuresComplController',
            controllerAs: 'vm'
        }).
            when('/IjssSalaireMensualise', {
            templateUrl: 'app/Paie/IjssSalaireMensualise/ijssSalaireMen.html',
            controller: 'IjssSalaireMenController',
            controllerAs: 'vm'
        }).
            otherwise({
            redirectTo: '/'
        });
    }
})(CalculetteRH || (CalculetteRH = {}));

//# sourceMappingURL=app.js.map
