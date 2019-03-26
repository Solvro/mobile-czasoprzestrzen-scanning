import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import PrivateRoute from './services/PrivateRoot';
import HomePage from './Screens/HomePage/HomePage';
import RentPage from './Screens/RentTablePage/RentTablePage';
import AdminPage from './Screens/AdminPage/AdminPage';
import ClientTablePage from './Screens/ClientsTablePage/ClientsTablePage';
import AddItemPage from './Screens/AddItemPage/AddItemPage';
import LoginPage from './Screens/LoginPage/LoginPage';
import { MuiThemeProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import theme from './theme';


// class App extends Component {

//   render() {
//     return (
  const App = ({ classes }) => (
      <MuiThemeProvider theme={theme}>
      <Router>
      <div>
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path='/home' component={HomePage} />
        <PrivateRoute path='/rents' component={RentPage} />
        <PrivateRoute path='/clients' component={ClientTablePage} />
        <PrivateRoute path='/account' component={AdminPage} />
        <PrivateRoute path='/adds' component={AddItemPage} />
      </div>
      </Router> 
    </MuiThemeProvider>
    );
//   }
// }

// App.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };

  export default App;


