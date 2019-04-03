import React from 'react';
import { Alert, View, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Container, Text, ListItem, Radio, Left, Right } from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import validator from 'validator';
import SubmitButton from '../components/SubmitButton';
import TextInputField from '../components/TextInputField';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';

import alertStrings from '../assets/strings/AlertStrings.js';
import buttonStrings from '../assets/strings/ButtonStrings.js';

import logo from '../assets/logo_with_name.png';
import { ScrollView } from 'react-native-gesture-handler';

import apiConfig from '../services/api/config';

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
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            isPerson: true,
            form: this.generateBasicForm(),
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

    validateData = () => {
        //if sth is null
        if (!(this.state.username && this.state.password1 && this.state.password2 && this.state.email
            && this.state.phoneNumber && this.state.firstName && this.state.lastName)) {
            this.showWarningAlert(alertStrings.emptyField);
        }
        //validate username
        else if (this.state.username.length < 5) {
            this.showWarningAlert(alertStrings.usernameToShort);
        }
        //validate e-mail
        else if (!validator.isEmail(this.state.email)) {
            this.showWarningAlert(alertStrings.invalidEmail);
        }
        //validate passwords
        else if (this.state.password1.length < 5) {
            this.showWarningAlert(alertStrings.passwordToShort);
        }
        else if (this.state.password1.localeCompare(this.state.password2) != 0) {
            this.showWarningAlert(alertStrings.differentPasswords);
        }
        //validate phone number
        else if (!validator.isMobilePhone(this.state.phoneNumber, 'pl-PL')) {
            this.showWarningAlert(alertStrings.invalidPhoneNumber);
        } else {
            // this.showRegisterAlert();
            // this.props.navigation.navigate("SignIn");
            return true;
        }

        return false;
    }

    /**
     * Handles login button press action.
     */
    handlePressRegister = async () => {
        let validationResult = this.validateData();
        let address = null;
        let businessData = null;

        if (!validationResult) {
            return;
        }

        const { username, password1, firstName, lastName, email, phoneNumber } = this.state;

        if (!this.state.isPerson) {
            result = this.getBusinessData();
            address = result[0];
            businesData = result[1];
        }

        const data = {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password1,
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'phone': phoneNumber,
                'address': address,
                'business_data': businessData,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // TODO: change endpoint
        await fetch(apiConfig.url + '/api-v1/client/', data)
            .then((response) => { this.setState({ status: response.status }); return response.json() })
            .then((response) => {
                if (this.state.status === 201) {
                    this.showRegisterAlert();
                    this.props.navigation.navigate("SignIn");
                } else {    
                    Alert.alert(alertStrings.unexpectedError);
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
            });
    }

    getBusinessData = () => {
        address = this.state.street + ' ' + this.state.city + ' ' + this.state.postalCode;
        bussinesData = 'NIP: ' + this.state.nip + ' REGON: ' + this.state.regon;
        return [address, bussinesData];
    }

    showWarningAlert(text) {
        Alert.alert(
            'Nieprawidłowe dane!',
            text,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    showRegisterAlert() {
        Alert.alert(
            'Poprawna rejestracja!',
            'Teraz musisz poczekać na akceptację.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    setStateHandler = (state, text) => {
        this.setState({ state, text });
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event });
    }

    handleFirstNameChane = (event) => {
        this.setState({ firstName: event });
    }

    handleLastNameChange = (event) => {
        this.setState({ lastName: event });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event });
    }

    handlePassword1Change = (event) => {
        this.setState({ password1: event });
    }

    handlePassword2Change = (event) => {
        this.setState({ password2: event });
    }

    handlePhoneNumberChange = (event) => {
        this.setState({ phoneNumber: event });
    }

    handleStreetChange = (event) => {
        this.setState({ street: event });
    }

    handlePostalCodeChange = (event) => {
        this.setState({ postalCode: event });
    }

    handleCityChange = (event) => {
        this.setState({ city: event });
    }

    handleNipChange = (event) => {
        this.setState({ nip: event });
    }

    handleRegonChange = (event) => {
        this.setState({ regon: event });
    }

    showForm = () => {
        if (this.isPerson) this.setState({ form: this.generateBasicForm() })
        else this.setState({ form: this.generateBusinessForm() })
        this.refresh()
    }

    generateBasicForm = () => {
        return (
            <View>

            </View>
        );
    }

    showBasic = () => {
        this.setState({ isPerson: true })
        this.showForm()
    }
    showBusiness = () => {
        this.setState({ isPerson: false })
        this.showForm()
    }


    generateBusinessForm = () => {
        return (
            <View>
                {this.generateBasicForm()}
            </View>
        );
    }

    render() {
        return (
            <Container>
                <TouchableWithoutFeedback
                    onPress={() => {
                        DismissKeyboard();
                    }}>
                    <Animated.View style={loginRegisterStyles.background}>
                        <View style={loginRegisterStyles.registerLogoContainer}>
                            <Animated.Image source={logo} resizeMode='contain'
                                style={
                                    { height: this.imageHeight }} />
                        </View>
                        <ScrollView style={loginRegisterStyles.scrollView}>
                            <View style={loginRegisterStyles.radioButtonContainer} >
                                <ListItem style={loginRegisterStyles.radioButton} onPress={() => this.setState({ isPerson: true })} >
                                    <Left>
                                        <Text>Osoba fizyczna</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={this.state.isPerson} />
                                    </Right>
                                </ListItem>
                                <ListItem style={loginRegisterStyles.radioButton} onPress={() => this.setState({ isPerson: false })} >
                                    <Left>
                                        <Text>Firma</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={!(this.state.isPerson)} />
                                    </Right>
                                </ListItem>
                            </View>
                            <View style={loginRegisterStyles.inputFieldsContainer}>
                                <TextInputField
                                    setStateHandler={this.handleUsernameChange}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    placeholder={'Nazwa użytkownika'}
                                    secureTextEntry={false}
                                />
                                <TextInputField
                                    setStateHandler={this.handleFirstNameChane}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    placeholder={'Imię'}
                                    secureTextEntry={false}
                                />
                                <TextInputField
                                    setStateHandler={this.handleLastNameChange}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    placeholder={'Nazwisko'}
                                    secureTextEntry={false}
                                />
                                <TextInputField
                                    setStateHandler={this.handleEmailChange}
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    placeholder={'Adres e-mail'}
                                    secureTextEntry={false}
                                />
                                <TextInputField
                                    setStateHandler={this.handlePassword1Change}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    placeholder={'Hasło'}
                                    secureTextEntry={true}
                                />
                                <TextInputField
                                    setStateHandler={this.handlePassword2Change}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    placeholder={'Powtórz hasło'}
                                    secureTextEntry={true}
                                />
                                <TextInputField
                                    setStateHandler={this.handlePhoneNumberChange}
                                    keyboardType='phone-pad'
                                    returnKeyType='next'
                                    placeholder={'Numer telefonu'}
                                    secureTextEntry={true}
                                />

                            </View>
                            <View >
                                {!this.state.isPerson && (
                                    <View>
                                        <View style={loginRegisterStyles.inputFieldsContainer}>
                                            <TextInputField
                                                setStateHandler={this.handleStreetChange}
                                                keyboardType='default'
                                                returnKeyType='next'
                                                placeholder={'Ulica i numer'}
                                                secureTextEntry={false}
                                            />
                                            <TextInputField
                                                setStateHandler={this.handlePostalCodeChange}
                                                keyboardType='phone-pad'
                                                returnKeyType='next'
                                                placeholder={'Kod pocztowy'}
                                                secureTextEntry={false}
                                            />
                                            <TextInputField
                                                setStateHandler={this.handleCityChange}
                                                keyboardType='default'
                                                returnKeyType='next'
                                                placeholder={'Miejscowość'}
                                                secureTextEntry={false}
                                            />
                                        </View>
                                        <View style={loginRegisterStyles.inputFieldsContainer}>
                                            <TextInputField
                                                setStateHandler={this.handleNipChange}
                                                keyboardType='phone-pad'
                                                returnKeyType='next'
                                                placeholder={'NIP'}
                                                secureTextEntry={false}
                                            />
                                            <TextInputField
                                                setStateHandler={this.handleRegonChange}
                                                keyboardType='phone-pad'
                                                returnKeyType='next'
                                                placeholder={'REGON'}
                                                secureTextEntry={false}
                                            />
                                        </View>
                                    </View>
                                )}
                            </View>
                        </ScrollView>

                        <View style={loginRegisterStyles.registerButtonAndLinkContainer}>
                            <SubmitButton
                                handlePress={this.handlePressRegister}
                                buttonText={buttonStrings.registrationButton}
                                icon='md-add-circle-outline' />
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
