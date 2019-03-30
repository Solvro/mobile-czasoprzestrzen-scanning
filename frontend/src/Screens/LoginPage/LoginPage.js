
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import logo from '../../assests/czasoprzestrzen_logo.png';
import { authorizeUser, verifyUser } from '../../services/userService';


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
              this.props.history.push('/home');
      });
}

tryAuthorize = async e => {

  e.preventDefault();
  const { username, password } = this.state;
  console.log(username);
  // await authorizeUser(username, password).then(res => {
    
  //   if (res.status === 200) {
  //     console.log("RESPONSE"+res.data.access);
  //     localStorage.setItem('token', res.data.access);  
  //     this.props.history.push('/home')
  //   }
  //   else{
  //     console.log("ERRORR")
  //     this.setState({ loginError: true });
  //   }
  //   })

  const token = await authorizeUser(username, password);
        if (token) {
            await localStorage.setItem('token', token);
            this.props.history.push('/home')
        } else {
            this.setState({loginError: true})
        }
    
}

handleChangeUser = event => {
  this.setState({ username: event.target.value });
}

handleChangePassword = event => {
  this.setState({ password: event.target.value });
}

validateIsLogged = async () => {
  const token = await localStorage.getItem('token');
  const isLogged = token && await verifyUser(token);
  console.log(isLogged);
  return isLogged;
}

  render() {
    const header = <img src={logo} className='LogoStart' alt="Logo" />;
    const button = <Button link={'/home'} text={"Zaloguj"} onClick={this.tryAuthorize}></Button>;    

    return (
      <div>
        {this.state.loginError &&
                <ErrorDisplay
                    removeError={id => {this.setState({loginError: false})}}
                    errors={[{message: 'Błędny login lub hasło.', id: 100}]}
                    />}
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button} >

        <InputField placeholder={"Login"} rows={"1"} onChange={this.handleChangeUser}>
        </InputField>

        <InputField placeholder={"Hasło"} rows={"1"} onChange={this.handleChangePassword}>
        </InputField>
        
        </Form>
      </Layout>
      {this.state.loginError &&
                <ErrorDisplay
                    removeError={id => {this.setState({loginError: false})}}
                    errors={[{message: 'Błędny login lub hasło', id: 100}]}
                    />}
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);