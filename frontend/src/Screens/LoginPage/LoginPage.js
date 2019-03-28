import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import logo from '../../assests/czasoprzestrzen_logo.png';

import "./LoginPanel.css"

const styles = theme => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  },
});
// sudo docker-compose up --remove-orphans
class LoginPage extends React.Component {
  state = {
    name: '',
    password: '',
  }

  handleChangeUser = event => {
    this.setState({ name: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  
  render() {
    const header = <img src={logo} className='LogoStart' alt="Logo" />;
    const button = <Button link={'/home'} text={"Zaloguj"}></Button>;    

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