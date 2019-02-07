import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import HomePage from './Screens/HomePage/HomePage';
import Clients from './Screens/Clients/Clients';
import Rents from './Screens/Rents/Rents';
import Account from './Screens/Account/Account';
import Toolbar from './Components/Toolbar/Toolbar'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
        <Toolbar />

        <Route exact path="/" component={HomePage} />
        <Route path="/rents" component={Rents} />
        <Route path="/clients" component={Clients} />
        <Route path="/account" component={Account} />
      </div>
    </Router>
    );
  }
}

export default App;
