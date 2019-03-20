import React from 'react';
import {Alert, View, TextInput, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Container, Text, CheckBox, ListItem, List} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import validator from 'validator';
import SubmitButton from '../components/SubmitButton';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';
import inputFieldsStyles from '../styles/InputFieldsStyles.js';

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
                      <View style={loginRegisterStyles.registerLogoContainer}>
                          <Animated.Image source={logo} resizeMode='contain'
                              style={[loginRegisterStyles.logoStyle,
                                      {height: this.imageHeight}]} />
                          <Animated.Text style={[loginRegisterStyles.title, {marginBottom: this.keyboardHeight}]}>
                              Czasoprzestrzeń
                          </Animated.Text>
                      </View>
                      <View style={inputFieldsStyles.input}>
                          <TextInput style={inputFieldsStyles.inputField}
                              onChangeText = {(text) => this.setState({username: text})}
                              keyboardType = 'default'
                              returnKeyType = 'next'
                              placeholder = {'Nazwa użytkownika'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={inputFieldsStyles.input}>
                          <TextInput style={inputFieldsStyles.inputField}
                              onChangeText = {(text) => this.setState({email: text})}
                              keyboardType = 'email-address'
                              returnKeyType = 'next'
                              placeholder = {'Adres e-mail'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={inputFieldsStyles.input}>
                          <TextInput style={inputFieldsStyles.inputField}
                              onChangeText = {(text) => this.setState({password1: text})}
                              secureTextEntry = {true}
                              returnKeyType = 'next'
                              placeholder = {'Hasło'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={inputFieldsStyles.input}>
                          <TextInput style={inputFieldsStyles.inputField}
                              onChangeText = {(text) => this.setState({password2: text})}
                              secureTextEntry = {true}
                              returnKeyType = 'next'
                              placeholder = {'Powtórz hasło'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
                      <View style={inputFieldsStyles.input}>
                          <TextInput style={inputFieldsStyles.inputField}
                              onChangeText = {(text) => this.setState({phoneNumber: text})}
                              keyboardType = 'phone-pad'
                              returnKeyType = 'next'
                              placeholder = {'Numer telefonu'}
                              placeholderTextColor = '#a2aabc'
                              underlineColorAndroid = 'transparent'
                          />
                      </View>
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
                        <SubmitButton handlePress={this.handlePressRegister} buttonText={"Zarejestruj się"}/>
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
