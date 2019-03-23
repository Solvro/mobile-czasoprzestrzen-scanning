import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import logo from '../../assests/czasoprzestrzen_logo.png';
import fakeAuth from '../../services/userService';
import {authorizeUser} from '../../services/userService';
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
    name: '',
    password: '',
    loginError: false,
    redirectToReferrer: false
  }

  // login = () => {
  //   fakeAuth.authenticate(() => {
  //     this.setState(() => ({
  //       redirectToReferrer: true,
  //     }))
  //   })
  // }

  tryToAuthorize = async e => {
    const {username, password} = this.state;
    const token = await authorizeUser(username, password);
    if (token) {
        await localStorage.setItem('token', token);
        console.log("Succes???");
    } else {
        this.setState({loginError: true})
    }
  }

  handleChangeUser = event => {
    this.setState({ name: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  
  render() {
    // const { from } =  { from: { pathname: '/home' } }

    // if (this.state.redirectToReferrer === true) {
    //   return <Redirect to={'home'} />
    // }
    const header = <img src={logo} className='LogoStart' alt="Logo" />;
    const button = <Button link={'/home'} text={"Zaloguj"} onClick={this.tryToAuthorize}></Button>;    

    return (
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button} >

        <InputField placeholder={"Login"} rows={"1"} onChange={this.handleChangeUser}>
        </InputField>

        <InputField placeholder={"Hasło"} rows={"1"} onChange={this.handleChangePassword}>
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