import { authorizeUser, verifyUser } from '../../services/userService';
import InputField from '../../Components/Input/InputField';
import logo from '../../assests/czasoprzestrzen_logo.png';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import Form from '../../Components/Form/Form';
import PropTypes from 'prop-types';
import React from 'react';
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

  componentWillMount() {
    // verifyUser(localStorage.getItem('token')).then(
    //   res => {
    //     if (res.data.status === 'success')
    //       this.props.history.push('/home')
    //   }
    // );
  }

  tryAuthorize = async e => {
    const { username, password } = this.state;
    await authorizeUser(username, password).then(res => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);  
      }
    }).then(() => {
      this.props.history.push('/home')
    })
  }

  onInputPasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  onInputLoginChange = e => {
    this.setState({ username: e.target.value })
  }


  render() {
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