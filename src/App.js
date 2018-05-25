import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './app-navbar';
import Anciennete from './GestionPersonnel/anciennete';
import 'moment/locale/fr';
import { connect } from 'react-redux';
import {simpleAction} from './Actions/simpleAction';


class App extends Component {

  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
    return (
      <main>
        <AppNavBar/>                
        <Anciennete/>
        <button onClick={this.simpleAction}>Test redux action</button>
        <pre>
          {
            JSON.stringify(this.props)
          }
      </pre>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
