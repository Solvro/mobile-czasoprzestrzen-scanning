import React from 'react';
import {View, Alert, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Container, Text} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';
import SubmitButton from '../components/SubmitButton';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import apiConfig from '../services/api/config';

import logo from '../assets/logo.jpg';
import TextInputField from '../components/TextInputField';

/**
 * Renders login panel.
 */
export default class LoginPanel extends React.Component {
    constructor(props){
        super(props);

        this.imageHeight = new Animated.Value(200);
        this.keyboardHeight = new Animated.Value(50);

        this.state = {
            isReady: false,
            username: null,
            password: null,
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
            toValue: 100,
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
            toValue: 200,
        }).start();
        Animated.timing(this.keyboardHeight, {
            duration: 200,
            toValue: 50,
        }).start();
    }

    /**
     * Handles login button press action.
     */
    handlePressLogin = async () => {
        const { username, password } = this.state;
        console.log(this.state['username']);
        data = {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(apiConfig.url + '/api-v1/login/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            console.log(response);  
            if(this.state.status === 201) {
                console.log(response);
            } else {
                Alert.alert('XD');
            }
        })
        .catch(() => {
            Alert.alert('No connection with server!');
        });

    }

    handleChangeUsername = event => {
        this.setState({username: event.target.value});
        console.log(this.state.username);
    }

    handleChangePassword = event => {
        this.setState({password : event.target.value});
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
                        <TextInputField 
                            state={'username'}
                            setStateHandler={this.handleChangeUsername} 
                            keyboardType = 'email-address'
                            returnKeyType = 'next'
                            placeholder = {'Użytkownik'}
                            secureTextEntry = {false}
                        />
                        <TextInputField 
                            setStateHandler={this.setStateHandler} 
                            state={'password'}
                            keyboardType = 'default'
                            returnKeyType = 'next'
                            placeholder = {'Hasło'}
                            secureTextEntry = {true}
                        />
                        <View style ={loginRegisterStyles.buttonAndLinkContainer}>
                            <SubmitButton 
                                handlePress={this.handlePressLogin} 
                                buttonText={buttonStrings.loginButton} 
                                icon = 'md-log-in'/>
                            <TouchableOpacity style={loginRegisterStyles.linkContainer} 
                                onPress={() => this.props.navigation.navigate("SignUp")}>
                                <Text style={loginRegisterStyles.linkText}>Nie masz jeszcze konta? Zarejestruj się!</Text>
                            </TouchableOpacity>
                      </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Container>
        )
    }
}