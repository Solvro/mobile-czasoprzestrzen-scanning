    import React from 'react';
import {Alert, View, TextInput, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Container, Text, CheckBox, ListItem, List} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import validator from 'validator';
import SubmitButton from '../components/SubmitButton';
import TextInputField from '../components/TextInputField';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';

import alertStrings from '../assets/strings/AlertStrings.js';
import buttonStrings from '../assets/strings/ButtonStrings.js';

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
            isPerson: false,
        }
    }

    componentWillMount() {
      
        this.keyboardWDidShowSub = Keyboard.addListener(
            "keyboardDidShow",
            this.keyboardDidShow
        );
        this.keyboardWDidHideSub = Keyboard.addListener(
            "keyboardDidHide",
            this.keyboardDidHide
        );
    }

    componentWillUnmount() {
        this.keyboardWDidShowSub.remove();
        this.keyboardWDidHideSub.remove();
    }

    /**
     * Handles keyboard showing when screen is taped.
     */
    keyboardDidShow = () => {
        Animated.timing(this.imageHeight, {
            duration: 200, 
            toValue: 50,
        }).start();
        Animated.timing(this.keyboardHeight, {
            duration: 200, 
            toValue: 0,
        }).start();
    }

    /**
     * Handles keyboard hiding when screen is taped and keyboard is visible. 
     */
    keyboardDidHide = () => {
        Animated.timing(this.imageHeight, {
            duration: 200,
            toValue: 100,
        }).start();
        Animated.timing(this.keyboardHeight, {
            duration: 200,
            toValue: 30,
        }).start();
    }
    /**
     * Handles login button press action.
     */
    handlePressRegister = () => {
      //if sth is null
      if (!(this.state.username && this.state.password1
        && this.state.password2 && this.state.email
        && this.state.phoneNumber)) {
          this.showWarningAlert(alertStrings.emptyField);
      }
      //validate username
      else if(this.state.username.length<5) {
          this.showWarningAlert(alertStrings.usernameToShort);
      }
      //validate e-mail
      else if (!validator.isEmail(this.state.email)){
          this.showWarningAlert(alertStrings.invalidEmail);
      }
      //validate passwords
      else if (this.state.password1.length<5) {
          this.showWarningAlert(alertStrings.passwordToShort);
      }
      else if (this.state.password1.localeCompare(this.state.password2)!=0) {
          this.showWarningAlert(alertStrings.differentPasswords);
      }
      //validate phone number
      else if (!validator.isMobilePhone(this.state.phoneNumber,'pl-PL')) {
          this.showWarningAlert(alertStrings.invalidPhoneNumber);
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

    setStateHandler = (state, text) => {
        this.setState({state, text});
    }

    render() {
        return(
          <Container>
              <TouchableWithoutFeedback
                  onPress={() => {
                      DismissKeyboard();
                  }}>
                  <Animated.View style={loginRegisterStyles.background}>
                      <View style={loginRegisterStyles.registerLogoContainer}>
                          <Animated.Image source={logo} resizeMode='contain'
                              style={[loginRegisterStyles.logoStyle,
                                      {height: this.imageHeight}]} />
                          <Animated.Text style={[loginRegisterStyles.title, {marginBottom: this.keyboardHeight}]}>
                              Czasoprzestrzeń
                          </Animated.Text>
                      </View>
                    <TextInputField
                        state = {'username'}
                        setStateHandler={this.setStateHandler}
                        keyboardType = 'default'
                        returnKeyType = 'next'
                        placeholder = {'Nazwa użytkownika'}
                        secureTextEntry = {false}
                    />
                    <TextInputField
                        state = {'email'}
                        setStateHandler={this.setStateHandler}
                        keyboardType = 'email-address'
                        returnKeyType = 'next'
                        placeholder = {'Adres e-mail'}
                        secureTextEntry = {false}
                    />
                    <TextInputField
                        state = {'password1'}
                        setStateHandler={this.setStateHandler}
                        keyboardType = 'default'
                        returnKeyType = 'next'
                        placeholder = {'Hasło'}
                        secureTextEntry = {true}
                    />
                    <TextInputField
                        state = {'password2'}
                        setStateHandler={this.setStateHandler}
                        keyboardType = 'default'
                        returnKeyType = 'next'
                        placeholder = {'Powtórz hasło'}
                        secureTextEntry = {true}
                    />
                    <TextInputField
                        state = {'phoneNumber'}
                        setStateHandler={this.setStateHandler}
                        keyboardType = 'phone-pad'
                        returnKeyType = 'next'
                        placeholder = {'Numer telefonu'}
                        secureTextEntry = {true}
                    />
                      <List>
                        <ListItem style={loginRegisterStyles.checkBoxContainer} onPress={() => this.setState({ isPerson: !this.state.isPerson })} >
                            <CheckBox 
                                color='#3b82c4'
                                style={loginRegisterStyles.CheckBox}
                                checked={this.state.isPerson} 
                                onPress={() => this.setState({ isPerson: !this.state.isPerson })} />
                            <Text style={loginRegisterStyles.checkBoxText}>Osoba fizyczna</Text>
                        </ListItem>
                      </List>
                      <View style ={loginRegisterStyles.registerButtonAndLinkContainer}>
                        <SubmitButton 
                            handlePress={this.handlePressRegister} 
                            buttonText={buttonStrings.registrationButton}
                            icon = 'md-add-circle-outline'/>
                        <TouchableOpacity style={loginRegisterStyles.linkContainer}
                            onPress={() => this.props.navigation.navigate("SignIn")}>
                            <Text style={loginRegisterStyles.linkText}>Masz już konto? Zaloguj się!</Text>
                        </TouchableOpacity> 
                      </View>
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }

}
