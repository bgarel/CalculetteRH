import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {updateAnciennete} from '../../reducers/anciennete';

let AncienneteForm = props => {

    return (
        <form className="form-inline">
        <div className="form-group">
            <label className="mr-2">Date d'entrée</label>
            <Field component="input" type="text" name="dateEntree" className="form-control" placeholder="JJ/MM/AAAA"
                  />
        </div>
        <div className="form-group">
            <label className="ml-2 mr-2">au</label>
            <Field component="input" type="text" name="dateSortie" className="form-control" placeholder="JJ/MM/AAAA"
                  />
        </div>
        </form>
)};

AncienneteForm = reduxForm({
    form: 'anciennete',
    onChange: (values, dispatch) => { updateAnciennete(values, dispatch) }
  })(AncienneteForm)

export default AncienneteForm