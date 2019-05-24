
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import logo from '../../assests/czasoprzestrzen_logo.png';
import {resetPassword} from '../../services/userService';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import TextButton from '../../Components/Button/TextButton';
import "../../App.css"

const styles = theme => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  },
});

class LoginPage extends React.Component {
  
  state = {
    email: '',
    resetError: false,
    message:''
}



handleChangeEmail = event => {
  this.setState({ email: event.target.value });
}

tryReset = async e => {

  e.preventDefault();
  const {email} = this.state;
  const response = await resetPassword(email);
        if (response) {            
            this.props.history.push('/forgotpassconfirm');
        } else {
            this.setState({resetError: true, message: "Coś poszło nie tak"})
        }

  
    
}

validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(String(email).toLowerCase())){
    return false;
  }
  return true;
}


  render() {
    const header = <img src={logo} className='LogoStart' alt="Logo" />;
    const button = <div><Button link={'/forgotpassconfirm'} text={"Resetuj hasło"} onClick={this.tryReset}></Button>
    <TextButton link={'/forgotpassconfirm'} text={"Przejdź do resetu hasła"}></TextButton></div>;    

    return (
      <div>
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button} >
        <div className="resetPasswordInsctructions">Aby zresetować swoje hasło, wpisz poniżej adres e-mail powiązany z Twoim kontem, a następnie 
          postępuj zgodnie z instrukcjami zawartymi w otrzymanej wiadomości.
        </div>
        <InputField placeholder={"E-mail"} rows={"1"} onChange={this.handleChangeEmail}>
        </InputField>
          
        
        </Form>
      </Layout>

      {this.state.resetError &&
                <ErrorDisplay
                    removeError={id => {this.setState({resetError: false})}}
                    errors={[{message: this.state.message, id: 100}]}
                    />}
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);