import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import PrivateRoute from './services/PrivateRoot';
import HomePage from './Screens/HomePage/HomePage';
import RentPage from './Screens/RentTablePage/RentTablePage';
import AdminPage from './Screens/AdminPage/AdminPage';
import ClientTablePage from './Screens/ClientsTablePage/ClientsTablePage';
import AddItemPage from './Screens/AddItemPage/AddItemPage';
import LoginPage from './Screens/LoginPage/LoginPage';
import ForgotPasswordPage from './Screens/ForgotPasswordPage/ForgotPasswordPage';
import { MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import NewAccountPage from './Screens/NewAccountPage/NewAccountPage';
import ChangePasswordPage from './Screens/ChangePasswordPage/ChangePasswordPage';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      prevPath: true 
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
  }
  
    render(){
      return(
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/forgotpass" component={ForgotPasswordPage}/>
            <PrivateRoute path='/home' component={HomePage} />
            <PrivateRoute path='/rents' component={RentPage} />
            <PrivateRoute path='/clients' component={ClientTablePage} />
            <PrivateRoute path='/account' component={AdminPage} />
            <PrivateRoute path='/adds' component={AddItemPage} />
            <PrivateRoute path="/createNewAccount" component={NewAccountPage} />
            <PrivateRoute path="/createNewAccount" component={ChangePasswordPage} />
        </Switch> 
      </Router>      
    </MuiThemeProvider>
    );
    }
      
}

  export default App;


