import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { verifyUser } from './userService';


class PrivateRoute extends React.Component {

  state = {
    loggedIn: false,
    authorized: false,
    loginInfo: true,
  }

  validateIsLogged = async () => {
    const token = await localStorage.getItem('token');
    return verifyUser(token);
  }

  setPreviousPath = async() => {
    await localStorage.setItem('prev', 'login');
  }

  componentWillMount(){
   this.validateIsLogged()
      .then(isLogged => {
        if(isLogged === true )
          this.setState({loggedIn: true})
          this.setPreviousPath();
        this.setState({authorized: true})
      })
      .catch(err => {
        this.setState({authorized: true})
      })
  }

  render () {
    const {component: Component, ...rest} = this.props;
    const renderComponent = (props) => (
      this.state.loggedIn
        ? <div><Component {...props} /></div>
        : (<Redirect to='/login' />)
    
     );

    return (
        this.state.authorized ?
        <Route {...rest} render={renderComponent} />
        : <div></div>
    );
  }
}

export default PrivateRoute;
