import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Form from '../../Components/Form/Form';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import {createNewAdminAccount} from '../../services/adminService';

class NewAccountPage extends Component {

  state = {
    username: '',
    password: '',
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
    this.setState({ phone: event.target.value });
  }

  validate = async e => {
    e.preventDefault();
    if (!this.state.username ||
        !this.state.password ||
        !this.state.email ||
        !this.state.phone) 
    {
      this.setState({errorMsg: 'Należy wypełnić wszystkie pola oznaczone *'})
    } else {
      const { username, password, firstName, lastName, email, phone } = this.state;
      const response = await createNewAdminAccount(username, password, firstName, lastName, email, phone);

      if (response) {
        alert("Utworzono nowe konto")
      } else {
          this.setState({errorMsg: "Coś poczło nie tak"})
      }
    }
    
  }

  render() {
    const button = <Button link={'/account'} onClick={this.validate} text={"Zatwierdź"}></Button>;
    const header = <div class='headText'>Utwórz konto</div>;

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
                      onChange = {this.handleChangePhone}>
          </InputField>

 
        </Form>
      </Layout>
      </div>
    ) ;
  }
}

export default NewAccountPage;