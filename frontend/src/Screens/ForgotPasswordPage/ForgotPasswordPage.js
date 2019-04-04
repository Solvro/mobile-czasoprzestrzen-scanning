
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import logo from '../../assests/czasoprzestrzen_logo.png';


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



handleChangeUser = event => {
  this.setState({ username: event.target.value });
}

handleChangePassword = event => {
  this.setState({ password: event.target.value });
}

  render() {
    const header = <img src={logo} className='LogoStart' alt="Logo" />;
    const button = <div><Button link={'/home'} text={"Resetuj hasło"}></Button></div>;    

    return (
      <div>
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button} >

        <InputField placeholder={"E-mail"} rows={"1"} onChange={this.handleChangeUser}>
        </InputField>
          
        
        </Form>
      </Layout>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);