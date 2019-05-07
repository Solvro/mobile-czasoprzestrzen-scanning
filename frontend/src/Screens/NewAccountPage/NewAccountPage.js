import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Form from '../../Components/Form/Form';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import {createNewAdminAccount} from '../../services/adminService';
import {createNewSuperAdminAccount} from '../../services/superAdminService';
import InputAdornment from '@material-ui/core/InputAdornment';
import TypeSelect from '../../Components/Selects/Select';


class NewAccountPage extends Component {

  state = {
    username: '',
    password: '',
    accountType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    errorMsg: ''
  }

  

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  }
  
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  }
  
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }
  
  handleChangePhone = event => {
    var phoneNumber = event.target.value
    if(isNaN(phoneNumber)){
      this.setState({errorMsg: "Numer telefonu powinien składać się z dziewięciu cyfr"})
    } else {
      this.setState({ phone: event.target.value });
    }
    
  }

  handleAccountType = event => {
      this.setState({accountType: event.target.value});
  }

  validate = async e => {
    e.preventDefault();
    
    try {
      this.validateUsername(this.state.username)
      this.validatePassword(this.state.password)
      this.validateEmail(this.state.email)
      this.validatePhoneNumber(this.state.phone)
      var { username, password, firstName, lastName, email, phone } = this.state;
      phone = "+48" + phone
      var response;
      if(this.state.accountType===1){ 
        response = await createNewAdminAccount(username, password, firstName, lastName, email, phone);
      } else{
        response = await createNewSuperAdminAccount(username, password, firstName, lastName, email, phone);
      }

      if (response===201 || response===200) {
        this.props.history.push({
          pathname: '/account',
          infoMessage: 'Pomyślnie utworzono nowe konto ' + (this.state.accountType===0 ? "admina" : "super admina")        })
      } else if(response===400){
        throw new Error("Konto z taką nazwą już istnieje")
      } else if(response===403){
        throw new Error("Nie masz uprawnień do wykonania tej akcji")
      } else {
        throw new Error("Coś poszło nie tak")
      }
    } catch(error){
      this.setState({errorMsg: error.message})
    }
    
  }

  validateUsername(username){
    if(!username){
      throw new Error('Należy wypełnić wszystkie pola oznaczone *')
    }
  }

  validatePassword(password){
    if(!password){
      throw new Error('Należy wypełnić wszystkie pola oznaczone *')
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())){
      throw new Error('Nieprawidłowy adres email')
    }
  }

  validatePhoneNumber(phoneNumber){
    if(phoneNumber.toString().length !==9){
      throw new Error('Numer telefonu powinien składać się z dziewięciu cyfr')
    }
  }

  render() {
    const button = <Button link={'/account'} onClick={this.validate} text={"Zatwierdź"}></Button>;
    const header = <div className='headText'>Utwórz konto</div>;

    return(
      <div className="container">

            {this.state.errorMsg &&
              <ErrorDisplay
                  removeError={id => {this.setState({errorMsg: false})}}
                  errors={[{message: this.state.errorMsg, id: 100}]}
              />}
            <Toolbar/>
      <Layout layoutDivide = {"363"}>
        <Form header = {header} button = {button}>

        <InputField placeholder = {"Wprowadź nazwę użytkownika"}
                      rows = {"1"}
                      label = {"Nazwa użytkownika*"}
                      onChange = {this.handleChangeUsername}>
          </InputField>

          <InputField placeholder = {"Wprowadź hasło"} 
                      type = {"password"} 
                      label = {"Hasło*"}
                      rows = {"1"}
                      onChange = {this.handleChangePassword}>
          </InputField>

          <TypeSelect value={""} onChange={this.handleAccountType} itemTypes={[{id: 1, type_name: "Admin"},{id: 2, type_name: "Super admin"} ]}></TypeSelect>


          <InputField placeholder = {"Wprowadź imię"}
                      rows = {"1"}
                      label = {"Imię"} 
                      onChange = {this.handleChangeFirstName}>
          </InputField>

          <InputField placeholder = {"Wprowadź nazwisko"}
                      rows = {"1"}
                      label = {"Nazwisko"}
                      onChange = {this.handleChangeLastName}>
          </InputField>

          <InputField placeholder = {"Wprowadź adres e-mail"}
                      rows = {"1"} 
                      label = {"E-mail*"} 
                      onChange = {this.handleChangeEmail}>
          </InputField>

          <InputField placeholder = {"Wprowadź numer telefonu"}
                      rows = {"1"} 
                      label = {"Telefon*"} 
                      onChange = {this.handleChangePhone}
                      inputprops={{startAdornment: <InputAdornment position='start' >(+48)</InputAdornment>}}>
          </InputField>

 
        </Form>
      </Layout>
      </div>
    ) ;
  }
}

export default NewAccountPage;