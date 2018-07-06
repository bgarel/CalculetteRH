// Copyright 2015-2018 calculette-rh.com

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import counter from './counter';
import anciennete from './anciennete';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  router: routerReducer,
  counter,
  anciennete,
  form: formReducer
});
