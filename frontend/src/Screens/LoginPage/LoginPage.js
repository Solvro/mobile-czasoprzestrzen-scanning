import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import logo from '../../assests/czasoprzestrzen_logo.png';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import { authorizeUser, verifyUser }  from '../../services/userService';
import {
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'

import "./LoginPanel.css"

const styles = theme => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  },
});

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    loginError: false
}

componentWillMount(){
    this.validateIsLogged()
        .then(isLogged => {
            if (isLogged)
                this.props.history.push('/home')
        });
}

tryAuthorize = async e => {
  console.log("TRY TO AYTH");
    e.preventDefault();
    const {username, password} = this.state;
    var token = await authorizeUser(username, password);
    console.log(token + "TOKEN");
    if (token) {
      
        await localStorage.setItem('token', token);
        
        this.props.history.push('/')
    } else {
      console.log(token + "ERROR :__(");
        this.setState({loginError: true})
    }
}

onInputPasswordChange = e => {
    this.setState({password: e.target.value})
}

onInputLoginChange = e => {
    this.setState({username: e.target.value})
}

validateIsLogged = async () => {
    const token = await localStorage.getItem('token');
    console.log("LOCAL STORAGE "+ localStorage.getItem('token'));
    const isLogged = token && await verifyUser(token);
    return isLogged;
}

  
  render() {
    // const { from } =  { from: { pathname: '/home' } }

    // if (this.state.redirectToReferrer === true) {
    //   return <Redirect to={'home'} />
    // }
    const header = <img src={logo} className='LogoStart' alt="Logo" />;
    const button = <Button link={'/home'} text={"Zaloguj"} onClick={this.tryAuthorize}></Button>;    

    return (
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button} >

        <InputField placeholder={"Login"} rows={"1"} onChange={this.onInputLoginChange}>
        </InputField>

        <InputField placeholder={"Hasło"} rows={"1"} onChange={this.onInputPasswordChange}>
        </InputField>

        </Form>
      </Layout>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);