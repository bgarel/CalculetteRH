// Copyright 2015-2018 calculette-rh.com

import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../home';
import Anciennete from '../gestionPersonnel/anciennete';
import ConversionMinCent from '../gestionPersonnel/conversionMinCent';
import AppNavBar from './app-navbar';

const App = () => (
  <div>
    <AppNavBar />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/gestionPersonnel/anciennete" component={Anciennete} />
      <Route exact path="/gestionPersonnel/conversionMinCent" component={ConversionMinCent} />
    </main>
  </div>
);

export default App;
