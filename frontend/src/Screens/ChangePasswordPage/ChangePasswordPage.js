import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Form from '../../Components/Form/Form';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import { changePassword } from '../../services/userService';

class ChangePasswordPage extends Component {

  state = {
    oldPassword: '',
    newPassword: '',
    repetitionOfNewPassword: '',
    errorMsg: ''
}

validate = async e => {
    e.preventDefault();
    if (this.state.newPassword!==this.state.repetitionOfNewPassword) {
      this.setState({errorMsg: 'Podane hasła różnią się od siebie'})
    } else if (!this.state.oldPassword ||
      !this.state.repetitionOfNewPassword ||
      !this.state.newPassword) 
    {
       this.setState({errorMsg: 'Należy wypełnić wszystkie pola'})
    } else {
      const response = await changePassword(this.state.oldPassword, this.state.newPassword);

      if (response===200) {
        this.props.history.push({
          pathname: '/account',
          infoMessage: 'Pomyślnie zmieniono hasło'
        })
      } else if(response===401){
          this.setState({errorMsg: "Wprowadzono niepoprawne hasło"})
      } else {
          this.setState({errorMsg: "Coś poszło nie tak"})
      }
    }
    
}

handleChangeOldPassword = event => {
  this.setState({ oldPassword: event.target.value });
}

handleChangeNewPassword = event => {
  this.setState({ newPassword: event.target.value });
}

handleChangeRepetitionOfNewPassword = event => {
  this.setState({ repetitionOfNewPassword: event.target.value });
}

  render() {
    const button = <Button link={'/account'} onClick={this.validate} text={"Zatwierdź"}></Button>;
    const header = <div className='headText'>Zmień hasło</div>;

    return(
      <div className="container">

            {this.state.errorMsg &&
              <ErrorDisplay
                  removeError={id => {this.setState({errorMsg: false})}}
                  errors={[{message: this.state.errorMsg, id: 100}]}
              />}
            <Toolbar/>
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button}>

          <InputField placeholder={"Stare hasło"}
                      type={"password"} 
                      rows={"1"}
                      label={"Wprowadź stare hasło"} 
                      onChange={this.handleChangeOldPassword}>
          </InputField>

          <InputField placeholder={"Nowe hasło"} 
                      type={"password"} 
                      rows={"1"} 
                      label={"Wprowadź nowe hasło"} 
                      onChange={this.handleChangeNewPassword}>
          </InputField>

          <InputField placeholder={"Nowe hasło"} 
                      type={"password"} 
                      rows={"1"} 
                      label={"Powtórz nowe hasło"} 
                      onChange={this.handleChangeRepetitionOfNewPassword}>
          </InputField>

          


 
        </Form>
      </Layout>
      </div>
    ) ;
  }
}

export default ChangePasswordPage;