import React from 'react';
import {Alert, View, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Container, Text, ListItem, Radio, Left, Right} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import SubmitButton from '../components/SubmitButton';
import TextInputField from '../components/TextInputField';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';

import alertStrings from '../assets/strings/AlertStrings.js';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import registrationStrings from '../assets/strings/RegistrationStrings.js';
import {isNip, isRegon, isUsername, isEmail, isPassword, isPhoneNumber, isPostalCode} from '../validator/DataValidator.js';

import logo from '../assets/logo_with_name.png';
import { ScrollView } from 'react-native-gesture-handler';

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
            street: null,
            postalCode: null,
            city: null,
            nip: null,
            regon: null,
            isPerson: true,
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
          } else if (!(this.state.isPerson) && !(this.state.street && this.state.postalCode
          && this.state.city && this.state.nip && this.state.regon)) {
              this.showWarningAlert(alertStrings.emptyField);
          }
        //validate username
        else if(!isUsername(this.state.username)) {
            this.showWarningAlert(alertStrings.usernameToShort);
        }
        //validate e-mail
        else if (!isEmail(this.state.email)){
            this.showWarningAlert(alertStrings.invalidEmail);
        }
        //validate passwords
        else if (!isPassword(this.state.password1)) {
            this.showWarningAlert(alertStrings.passwordToShort);
        }
        else if (this.state.password1.localeCompare(this.state.password2)!=0) {
            this.showWarningAlert(alertStrings.differentPasswords);
        }
        //validate phone number
        else if (!isPhoneNumber(this.state.phoneNumber)) {
            this.showWarningAlert(alertStrings.invalidPhoneNumber);
        } 
        //validate postal code
        else if (!(this.state.isPerson) && !isPostalCode(this.state.postalCode)) {
              this.showWarningAlert(alertStrings.invalidPostalCode);
        }
        //validate nip 
        else if (!(this.state.isPerson) && !isNip(this.state.nip)) {
          this.showWarningAlert(alertStrings.invalidNIP);
        }
        //validate regon 
        else if (!(this.state.isPerson) && !isRegon(this.state.regon)) {
          this.showWarningAlert(alertStrings.invalidRegon);
        }
        else {
          this.showRegisterAlert();
          this.props.navigation.navigate("SignIn");
        }
  
      }
  

    showWarningAlert(text) {
      Alert.alert(
        alertStrings.invalidData,
        text,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    showRegisterAlert() {
      Alert.alert(
        alertStrings.correctRegistration,
        alertStrings.possibleSignIn,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    handleUsernameChange = (event) => {
        this.setState({username: event});
    }

    handlePassword1Change = (event) => {
        this.setState({password1: event});
    }

    handlePassword2Change = (event) => {
        this.setState({password2: event});
    }

    handleEmailChange = (event) => {
        this.setState({email: event});
    }

    handlePhoneNumberChange = (event) => {
        this.setState({phoneNumber: event});
    }

    handleStreetChange = (event) => {
        this.setState({street: event});
    }

    handlePostalCodeChange = (event) => {
        this.setState({postalCode: event});
    }

    handleCityChange = (event) => {
        this.setState({city: event});
    }

    handleNipChange = (event) => {
        this.setState({nip: event});
    }
    
    handleRegonChange = (event) => {
        this.setState({regon: event});
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
                          style={
                                  {height: this.imageHeight}} /> 
                  </View> 
                  <ScrollView style={loginRegisterStyles.scrollView}>
                      <View style={loginRegisterStyles.radioButtonContainer} >
                          <ListItem style={loginRegisterStyles.radioButton} onPress={() =>  this.setState({isPerson: true})} >
                              <Left>
                                  <Text>{registrationStrings.person}</Text>
                              </Left>
                              <Right>
                                  <Radio onPress={() =>  this.setState({isPerson: true})} selected={this.state.isPerson}/>
                              </Right>
                          </ListItem>
                          <ListItem style={loginRegisterStyles.radioButton} onPress={() => this.setState({isPerson: false})} >
                              <Left>
                                  <Text>{registrationStrings.company}</Text>
                              </Left>
                              <Right>
                                  <Radio onPress={() => this.setState({isPerson: false})} selected={!(this.state.isPerson)}/>
                              </Right>
                          </ListItem>
                      </View>
                      <View style={loginRegisterStyles.inputFieldsContainer}>
                          <TextInputField
                              state = {'username'}
                              setStateHandler={this.handleUsernameChange}
                              keyboardType = 'default'
                              returnKeyType = 'next'
                              placeholder = {registrationStrings.username}
                              secureTextEntry = {false}
                          />
                          <TextInputField
                              state = {'email'}
                              setStateHandler={this.handleEmailChange}
                              keyboardType = 'email-address'
                              returnKeyType = 'next'
                              placeholder = {registrationStrings.email}
                              secureTextEntry = {false}
                          />
                          <TextInputField
                              state = {'password1'}
                              setStateHandler={this.handlePassword1Change}
                              keyboardType = 'default'
                              returnKeyType = 'next'
                              placeholder = {registrationStrings.password}
                              secureTextEntry = {true}
                          />
                          <TextInputField
                              state = {'password2'}
                              setStateHandler={this.handlePassword2Change}
                              keyboardType = 'default'
                              returnKeyType = 'next'
                              placeholder = {registrationStrings.repeatPassword}
                              secureTextEntry = {true}
                          />
                          <TextInputField
                              state = {'phoneNumber'}
                              setStateHandler={this.handlePhoneNumberChange}
                              keyboardType = 'number-pad'
                              returnKeyType = 'next'
                              placeholder = {registrationStrings.phoneNumber}
                              secureTextEntry = {false}
                          />

                      </View>
                      <View >
                          {!this.state.isPerson && (
                              <View>
                                  <View style={loginRegisterStyles.inputFieldsContainer}>
                                      <TextInputField
                                          state = {'street'}
                                          setStateHandler={this.handleStreetChange}
                                          keyboardType = 'default'
                                          returnKeyType = 'next'
                                          placeholder = {registrationStrings.street}
                                          secureTextEntry = {false}
                                      />
                                      <TextInputField
                                          state = {'postalCode'}
                                          setStateHandler={this.handlePostalCodeChange}
                                          keyboardType = 'default'
                                          returnKeyType = 'next'
                                          placeholder = {registrationStrings.postalCode}
                                          secureTextEntry = {false}
                                      />
                                      <TextInputField
                                          state = {'city'}
                                          setStateHandler={this.handleCityChange}
                                          keyboardType = 'default'
                                          returnKeyType = 'next'
                                          placeholder = {registrationStrings.city}
                                          secureTextEntry = {false}
                                      />
                                  </View>
                                 <View style={loginRegisterStyles.inputFieldsContainer}>
                                      <TextInputField
                                          state = {'nip'}
                                          setStateHandler={this.handleNipChange}
                                          keyboardType = 'number-pad'
                                          returnKeyType = 'next'
                                          placeholder = {registrationStrings.nip}
                                          secureTextEntry = {false}
                                      />
                                      <TextInputField
                                          state = {'regon'}
                                          setStateHandler={this.handleRegonChange}
                                          keyboardType = 'number-pad'
                                          returnKeyType = 'next'
                                          placeholder = {registrationStrings.regon}
                                          secureTextEntry = {false}
                                      />
                                  </View>
                              </View>
                          )}
                      </View>
                  </ScrollView>
                  
                  <View style ={loginRegisterStyles.registerButtonAndLinkContainer}>
                      <SubmitButton 
                          handlePress={this.handlePressRegister} 
                          buttonText={buttonStrings.registrationButton}
                          icon = 'md-add-circle-outline'/>
                      <TouchableOpacity style={loginRegisterStyles.linkContainer}
                          onPress={() => this.props.navigation.navigate("SignIn")}>
                          <Text style={loginRegisterStyles.linkText}>{registrationStrings.returnToSignIn}</Text>
                      </TouchableOpacity> 
                  </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Container>

             
        )
    }

}
