import React from 'react';
import {Alert, View, TextInput, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {Container, Text} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import validator from 'validator';
import Checkbox from 'react-native-checkbox';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';

import logo from '../assets/logo.jpg';

export default class RegistrationPanel extends React.Component {

    constructor(props) {
        super(props);

        this.imageHeight = new Animated.Value(100);
        this.keyboardHeight = new Animated.Value(30);

        this.state = {
            isReady: false,
            username: null,
            password1: null,
            password2: null,
            email: null,
            phoneNumber: null,
            isPerson: null,
        }
    }


    /**
     * Handles login button press action.
     */
    handlePressRegister() {
      //if sth is null
      if (!(this.state.username && this.state.password1
        && this.state.password2 && this.state.email
        && this.state.phoneNumber)) {
          this.showWarningAlert('Pola nie mogą być puste.');
      }
      //validate username
      else if(this.state.username.length<5) {
          this.showWarningAlert('Nazwa użytkownika powinna zawierać min 5 znaków.');
      }
      //validate e-mail
      else if (!validator.isEmail(this.state.email)){
          this.showWarningAlert('Wprowadzono błędny adres e-mail.');
      }
      //validate passwords
      else if (this.state.password1.length<5) {
          this.showWarningAlert('Hasło powinno zawierać min 5 znaków.');
      }
      else if (this.state.password1.localeCompare(this.state.password2)!=0) {
          this.showWarningAlert('Wprowadzone hasła różnią się.');
      }
      //validate phone number
      else if (!validator.isMobilePhone(this.state.phoneNumber,'pl-PL')) {
          this.showWarningAlert('Wprowadzono błędny numer telefonu');
      } else {
        this.showRegisterAlert();
        this.props.navigation.navigate("SignIn");
      }

    }

    showWarningAlert(text) {
      Alert.alert(
        'Nieprawidłowe dane!',
        text,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    showRegisterAlert() {
      Alert.alert(
        'Poprawna rejestracja!',
        'Teraz możesz się zalogować.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    render() {
        return(
          <Container>
              <TouchableWithoutFeedback
                  onPress={() => {
                      DismissKeyboard();
                  }}>
                  <Animated.View style={loginRegisterStyles.background}>
                      <View style={loginRegisterStyles.logoContainer}>
                          <Animated.Image source={logo} resizeMode='contain'
                              style={[loginRegisterStyles.logoStyle,
                                      {height: this.imageHeight}]} />
                          <Animated.Text style={[loginRegisterStyles.title, {marginBottom: this.keyboardHeight}]}>
                              Czasoprzestrzeń
                          </Animated.Text>
                      </View>
                      <View style={loginRegisterStyles.input}>
                          <TextInput style={loginRegisterStyles.inputField}
                              onChangeText = {(text) => this.setState({username: text})}
                              keyboardType = 'default'
                              returnKeyType = 'next'
                              placeholder = {'Nazwa użytkownika'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={loginRegisterStyles.input}>
                          <TextInput style={loginRegisterStyles.inputField}
                              onChangeText = {(text) => this.setState({email: text})}
                              keyboardType = 'email-address'
                              returnKeyType = 'next'
                              placeholder = {'Adres e-mail'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={loginRegisterStyles.input}>
                          <TextInput style={loginRegisterStyles.inputField}
                              onChangeText = {(text) => this.setState({password1: text})}
                              secureTextEntry = {true}
                              returnKeyType = 'next'
                              placeholder = {'Hasło'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={loginRegisterStyles.input}>
                          <TextInput style={loginRegisterStyles.inputField}
                              onChangeText = {(text) => this.setState({password2: text})}
                              secureTextEntry = {true}
                              returnKeyType = 'next'
                              placeholder = {'Powtórz hasło'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={loginRegisterStyles.input}>
                          <TextInput style={loginRegisterStyles.inputField}
                              onChangeText = {(text) => this.setState({phoneNumber: text})}
                              keyboardType = 'phone-pad'
                              returnKeyType = 'next'
                              placeholder = {'Numer telefonu'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
              
                      <TouchableOpacity style={loginRegisterStyles.actionButton} onPress={() => this.handlePressRegister()}>
                              <Text style={loginRegisterStyles.buttonText}> Zarejestruj się</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={loginRegisterStyles.linkContainer}
                      onPress={() => this.props.navigation.navigate("SignIn")}>
                          <Text style={loginRegisterStyles.linkText}>Masz już konto? Zaloguj się!</Text>
                      </TouchableOpacity>

                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }

}
