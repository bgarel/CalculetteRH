import React from 'react';
import moment from 'moment';

export default class Anciennete extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            dateEntree: '',
            dateSortie: moment().format('DD/MM/YYYY'),
            anciennete: 0,
            ancienneteStr: '',
            isValid: false
        };            
      }

    updateAnciennete(newState) {        
        const dateEntree = moment(newState.dateEntree, 'DD/MM/YYYY', true);
        const dateSortie = moment(newState.dateSortie, 'DD/MM/YYYY', true).add(1, 'day');
        
        if (!dateEntree.isValid() || !dateSortie.isValid()
            || dateSortie.diff(dateEntree, 'year') > 200
            || dateSortie.diff(dateEntree, 'year') < 0) {
            newState.isValid = false;                  
            this.setState(newState);
            return;
        }

        const nbreAnnees = dateSortie.diff(dateEntree, 'year');
        const nbreMois = dateSortie.diff(dateEntree, 'month') - nbreAnnees * 12;
        let  nbreJours = 0;
        
        if (dateEntree.date() <= dateSortie.date()) {
            nbreJours = dateSortie.date() - dateEntree.date();
        }
        else {				
            var dateDebutInAnneeFin = moment({
                year: dateSortie.year(),
                month: dateSortie.month(),
                day: dateEntree.date()
            }).subtract(1, 'month');
            nbreJours = dateSortie.diff(dateDebutInAnneeFin, 'days');
}

        let chaineAnciennete = nbreAnnees + " an(s)";
        if (nbreMois > 0)
            chaineAnciennete += ", " + nbreMois + " mois";
        if (nbreJours > 0)
            chaineAnciennete += ", et " + nbreJours + " jours";
        
        newState.anciennete = dateSortie.diff(dateEntree, 'year', true);      
        newState.ancienneteStr = chaineAnciennete;  
        newState.isValid = true;      
        this.setState(newState);
    }

    onDateChanged(event, dateProperty) {
        let newState = {...this.state};
        newState[dateProperty] = event.target.value;        
        this.updateAnciennete(newState);
    }

   render() {
       return (
        <article className="container mt-3">
        <h1>Calcul de l'ancienneté</h1>
        <div className="mt-5">
            <form className="form-inline">
                <div className="form-group">
                    <label className="mr-2">Date d'entrée</label>
                    <input type="text" className="form-control" placeholder="JJ/MM/AAAA"
                        value={this.state.dateEntree} onChange={(e) => this.onDateChanged(e, 'dateEntree')} />
                </div>
                <div className="form-group">
                    <label className="ml-2 mr-2">au</label>
                    <input type="text" className="form-control" placeholder="JJ/MM/AAAA"
                        value={this.state.dateSortie} onChange={(e) => this.onDateChanged(e, 'dateSortie')} />
                </div>
            </form>
            {this.state.isValid &&
                <blockquote className="mt-3">
                    <p>
                        Ce salarié a <mark>{this.state.anciennete.toFixed(2)} an(s)</mark> d'ancienneté, soit {this.state.ancienneteStr}.
                    </p>
                </blockquote>
            }
        </div>
        </article>
        );
    }
}
