import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "react-private-route";
import LoggedIn from './Screens/LoggedIn/LoggedIn';
import LoginPage from './Screens/LoginPage/LoginPage';
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

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.login = this.login.bind(this);
  }
  isLoggedIn() {
    return this.state.isLoggedIn;
  }
  login() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  render() {
    return (
      <MuiThemeProvider theme={blueTheme}>
      <Router>
      <div className="container">
        <Switch>
        <Route
              path="/login"
              component={() => (
                <LoginPage login={this.login} isLogged={this.state.isLoggedIn} />
              )}
        />
        <PrivateRoute
              exact
              path="/home"
              component={LoggedIn}
              isAuthenticated={!!this.isLoggedIn()}
              redirect="/login"
            />
        {/* <Toolbar />

        <Route exact path="/" component={HomePage} />
        <Route path="/rents" component={Rents} />
        <Route path="/clients" component={Clients} />
        <Route path="/account" component={Account} />
        <Route path="/adds" component={Adds} /> */}
        </Switch>
      </div>
    </Router>
    </MuiThemeProvider>
    );
  }
}

export default App;
