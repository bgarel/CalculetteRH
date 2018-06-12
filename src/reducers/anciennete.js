import moment from 'moment';

export const UPDATE_ANCIENNETE = 'anciennete/UPDATE';

const initialState = {
  anciennete: null,
  ancienneteStr: '',
  isValid: false
};

const calculerAnciennete = (state, values) => {
  console.log(state);

  let newState = {...state};
  const dateEntree = moment(values.dateEntree, 'DD/MM/YYYY', true);
  const dateSortie = moment(values.dateSortie, 'DD/MM/YYYY', true).add(1, 'day');

  if (!dateEntree.isValid() || !dateSortie.isValid()
      || dateSortie.diff(dateEntree, 'year') > 200
      || dateSortie.diff(dateEntree, 'year') < 0) {
      newState.isValid = false;
      return newState;
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

  console.log(newState);
  return newState;
}

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_ANCIENNETE:
      return calculerAnciennete(state, action.payload);

    default:
      return state;
  }
};

export const updateAnciennete = (values, dispatch) => {
  dispatch({
    type: UPDATE_ANCIENNETE,
    payload: values
  });
};

