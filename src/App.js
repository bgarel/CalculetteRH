import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './app-navbar';
import Anciennete from './GestionPersonnel/anciennete';
import 'moment/locale/fr';

class App extends Component {
  render() {
    return (
      <main>
        <AppNavBar/>                
        <Anciennete/>
      </main>
    );
  }
}

export default App;
