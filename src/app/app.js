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
            var dateFin = moment(this.dateFinStr, 'DD/MM/YYYY').add(1, 'day');
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
            this.showIjssMaj = false;
        }
        IjssSalaireMenController.prototype.updateIjss = function () {
            var dateDebut = moment(this.dateDebutStr, 'DD/MM/YYYY');
            var dateFin = moment(this.dateFinStr, 'DD/MM/YYYY');
            if (!dateDebut.isValid() || dateDebut.year() < 1000) {
                this.isDateDebutValid = false;
                this.isIjssValid = false;
                return;
            }
            this.isDateDebutValid = true;
            var dateTemp = dateDebut.clone();
            this.moisNmoins1 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
            this.moisNmoins2 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
            this.moisNmoins3 = dateTemp.add(-1, 'month').locale('fr').format('MMMM YYYY');
            if (!dateDebut.isValid() || !dateFin.isValid()
                || dateFin.diff(dateDebut, 'day') < 3) {
                this.isIjssValid = false;
                return;
            }
            this.isIjssValid = true;
            //dateTemp = dateDebut.clone().add(1, 'day');			
            this.dateCarenceDebut = dateDebut; //moment.max([dateTemp, dateDebut]);
            this.dateCarenceFin = this.dateCarenceDebut.clone().add(2, 'day');
            this.dateIjssDebut = this.dateCarenceFin.clone().add(1, 'day');
            var minN3 = Math.min(this.salaireNMoins3, this.plafondSalaire);
            var minN2 = Math.min(this.salaireNMoins2, this.plafondSalaire);
            var minN1 = Math.min(this.salaireNMoins1, this.plafondSalaire);
            var moyenneBrut = (minN1 + minN2 + minN3) / 3 / (365 / 12) * 0.5;
            this.ijssBrut = Math.min(moyenneBrut, this.plafondIjss);
            this.ijssNet = 0.933 * this.ijssBrut;
            var nbJoursIjss = 0;
            var nbJoursIjssMaj = 0;
            if (this.nbEnfants) {
                if (this.nbEnfants < 3 || dateFin.diff(this.dateCarenceDebut, 'day') <= 29) {
                    this.showIjssMaj = false;
                    this.dateIjssFin = dateFin;
                    this.ijssMajBrut = 0;
                    this.ijssMajNet = 0;
                }
                else if (this.nbEnfants >= 3) {
                    this.showIjssMaj = true;
                    var moyenneBrutMaj = (minN1 + minN2 + minN3) / 3 / (365 / 12) * 0.666;
                    this.ijssMajBrut = Math.min(moyenneBrutMaj, this.plafondIjssMaj);
                    this.ijssMajNet = 0.933 * this.ijssMajBrut;
                    this.dateIjssFin = this.dateCarenceDebut.clone().add(29, 'day');
                    this.dateIjssMajDebut = this.dateIjssFin.clone().add(1, 'day');
                    this.dateIjssMajFin = dateFin;
                    nbJoursIjssMaj = this.dateIjssMajFin.diff(this.dateIjssMajDebut, 'day') + 1;
                }
                nbJoursIjss = this.dateIjssFin.diff(this.dateIjssDebut, 'day') + 1;
                this.nbJoursArret = nbJoursIjss + nbJoursIjssMaj;
                this.ijssTotalBrut = nbJoursIjss * this.ijssBrut + nbJoursIjssMaj * this.ijssMajBrut;
                this.ijssTotalNet = nbJoursIjss * this.ijssNet + nbJoursIjssMaj * this.ijssMajNet;
            }
        };
        IjssSalaireMenController.$inject = [
            'moment'
        ];
        return IjssSalaireMenController;
    })();
    CalculetteRH.IjssSalaireMenController = IjssSalaireMenController;
})(CalculetteRH || (CalculetteRH = {}));
var CalculetteRH;
(function (CalculetteRH) {
    'use strict';
    var IndemLicController = (function () {
        function IndemLicController(moment) {
            this.moment = moment;
            this.isIndemniteValid = false;
        }
        IndemLicController.prototype.updateIndemnite = function () {
            var dateEntree = moment(this.dateEntreeStr, 'DD/MM/YYYY');
            var dateFin = moment(this.dateSortieStr, 'DD/MM/YYYY');
            if (!dateEntree.isValid() || !dateFin.isValid()
                || dateFin.diff(dateEntree, 'year') > 200
                || dateFin.diff(dateEntree, 'year') < 0) {
                this.isIndemniteValid = false;
                return;
            }
            this.isIndemniteValid = true;
            var dateTemp = dateFin.clone();
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
            var anciennete = dateFin.add(1, 'day').diff(dateEntree, 'year', true);
            console.log('anciennete:' + anciennete);
            var salaireMoy3Mois = (+this.salaireN1 + (+this.salaireN2) + (+this.salaireN3)) / 3;
            var salaireMoy12Mois = (+this.salaireN1 + (+this.salaireN2) + (+this.salaireN3) + (+this.salaireN4) + (+this.salaireN5) + (+this.salaireN6)
                + (+this.salaireN7) + (+this.salaireN8) + (+this.salaireN9) + (+this.salaireN10) + (+this.salaireN11) + (+this.salaireN12)) / 12;
            this.salaireMoyen = Math.max(salaireMoy3Mois, salaireMoy12Mois);
            this.montant15 = this.salaireMoyen * anciennete / 5;
            this.montant25 = Math.max(0, this.salaireMoyen * (anciennete - 10) * 2 / 15);
            this.montantIndemnite = this.montant15 + this.montant25;
        };
        IndemLicController.$inject = [
            'moment'
        ];
        return IndemLicController;
    })();
    CalculetteRH.IndemLicController = IndemLicController;
})(CalculetteRH || (CalculetteRH = {}));
/// <reference path='./GestionPersonnel/Anciennete/AncienneteController.ts'/>
/// <reference path='./GestionPersonnel/ConversionMinCent/ConversionMinCentController.ts'/>
/// <reference path='./GestionPersonnel/HeuresCompl/HeuresComplController.ts'/>
/// <reference path='./GestionPersonnel/HeuresSup/HeuresSupController.ts'/>
/// <reference path='./Paie/IjssSalaireMensualise/IjssSalaireMenController.ts'/>
/// <reference path='./Paie/IndemLic/IndemLicController.ts'/>
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
        .controller("IndemLicController", CalculetteRH.IndemLicController)
        .config(['$routeProvider', configRoute]);
    function configRoute($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'app/accueil.html'
        })
            .when('/accueil', {
            templateUrl: 'app/accueil.html'
        })
            .when('/anciennete', {
            templateUrl: 'app/GestionPersonnel/Anciennete/anciennete.html',
            controller: 'AncienneteController',
            controllerAs: 'vm'
        })
            .when('/conversionMinCent', {
            templateUrl: 'app/GestionPersonnel/ConversionMinCent/conversionMinCent.html',
            controller: 'ConversionMinCentController',
            controllerAs: 'vm'
        })
            .when('/heuresSup', {
            templateUrl: 'app/GestionPersonnel/HeuresSup/heuresSup.html',
            controller: 'HeuresSupController',
            controllerAs: 'vm'
        })
            .when('/heuresCompl', {
            templateUrl: 'app/GestionPersonnel/HeuresCompl/heuresCompl.html',
            controller: 'HeuresComplController',
            controllerAs: 'vm'
        })
            .when('/IjssSalaireMensualise', {
            templateUrl: 'app/Paie/IjssSalaireMensualise/ijssSalaireMen.html',
            controller: 'IjssSalaireMenController',
            controllerAs: 'vm'
        })
            .when('/IndemLic', {
            templateUrl: 'app/Paie/IndemLic/indemLic.html',
            controller: 'IndemLicController',
            controllerAs: 'vm'
        })
            .otherwise({
            redirectTo: '/'
        });
    }
})(CalculetteRH || (CalculetteRH = {}));

//# sourceMappingURL=app.js.map
