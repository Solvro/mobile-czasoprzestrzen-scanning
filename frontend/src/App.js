import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from './Screens/HomePage/HomePage';
import Clients from './Screens/Clients/Clients';
import Rents from './Screens/Rents/Rents';
import Account from './Screens/Account/Account';
import Adds from './Screens/Adds/Adds';
import LoginPage from './Screens/LoginPage/LoginPage';
import Toolbar from './Components/Toolbar/Toolbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const blueTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#224f77',
      light: '#ebf3f9',
    },
    secondary: {
      main: '#00ff00',
    },
    action: {
      main: '#ff0000'
    }
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={blueTheme}>
      <Router>
      <div className="container">
        <Toolbar />

        <Route exact path="/" component={HomePage} />
        <Route path="/rents" component={Rents} />
        <Route path="/clients" component={Clients} />
        <Route path="/account" component={Account} />
        <Route path="/adds" component={Adds} />

      </div>
    </Router>
    </MuiThemeProvider>
    );
  }
}

export default App;
