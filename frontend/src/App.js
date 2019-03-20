import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "react-private-route";
import LoggedIn from './Screens/LoggedIn/LoggedIn';
import LoginPage from './Screens/LoginPage/LoginPage';
import { MuiThemeProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import theme from './theme';


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
      <MuiThemeProvider theme={theme}>
      <Router>
      <div className="container">
      {/* <Switch>
          <PrivateRoute path={'/home'} component={HomePage}/>
          <PrivateRoute path={'/clients'} component={Clients}/>
          <Route path={'/login'} component={LoginPage}/>
      </Switch> */}
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

App.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default App;
