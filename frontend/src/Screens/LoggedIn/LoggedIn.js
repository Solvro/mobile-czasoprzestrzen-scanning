import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import Clients from '../ClientsTablePage/ClientsTablePage';
import Rents from '../RentTablePage/RentTablePage';
import Account from '../AdminPage/AdminPage';
import Adds from '../AddItemPage/AddItemPage';
import Toolbar from '../../Components/Toolbar/Toolbar';

class LoggedIn extends Component {



  render() {
    return (
      <Router>
      <div className="container">
        
        <Toolbar />

        <Route path="/home" component={HomePage} />
        <Route path="/rents" component={Rents} />
        <Route path="/clients" component={Clients} />
        <Route path="/account" component={Account} />
        <Route path="/adds" component={Adds} />
      </div>
    </Router>
    );
  }
}

export default LoggedIn;
