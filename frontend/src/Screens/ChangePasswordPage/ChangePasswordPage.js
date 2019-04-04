import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TypeSelect from '../../Components/Selects/Select';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Form from '../../Components/Form/Form';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';


class ChangePasswordPage extends Component {

  state = {
    oldPassword: '',
    repetitionOfOldPassword: '',
    newPassword: '',
    errorMsg: false
}

validate = async e => {
    e.preventDefault();
    if (this.state.oldPassword!==this.state.repetitionOfOldPassword) {
      this.setState({errorMsg: 'Podane hasła różnią się od siebie'})
    } else if (!this.state.oldPassword ||
      !this.state.repetitionOfOldPassword ||
      !this.state.newPassword) 
    {
       this.setState({errorMsg: 'Należy wypełnić wszystkie pola'})
    } else {
       alert("TODO: Zamiast tego alertu idzie POST na backend");
    }
    
}

handleChangeOldPassword = event => {
  this.setState({ oldPassword: event.target.value });
}

handleChangeRepetitionOfOldPassword = event => {
  this.setState({ repetitionOfOldPassword: event.target.value });
}

handleChangeNewPassword = event => {
  this.setState({ newPassword: event.target.value });
}

  render() {
    const button = <Button link={'/account'} onClick={this.validate} text={"Zatwierdź"}></Button>;
    const header = <div class='headText'>Zmień hasło</div>;

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

          <InputField placeholder={"Stare hasło"} type={"password"} rows={"1"} label={"Wprowadź stare hasło"} onChange={this.handleChangeOldPassword}>
          </InputField>

          <InputField placeholder={"Stare hasło"} type={"password"} rows={"1"} label={"Powtórz stare hasło"} onChange={this.handleChangeRepetitionOfOldPassword}>
          </InputField>

          <InputField placeholder={"Nowe hasło"} type={"password"} rows={"1"} label={"Wprowadź nowe hasło"} onChange={this.handleChangeNewPassword}>
          </InputField>


 
        </Form>
      </Layout>
      </div>
    ) ;
  }
}

export default ChangePasswordPage;