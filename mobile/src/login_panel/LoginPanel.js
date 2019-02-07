import React from 'react'
import {View, TextInput, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {Container, Text} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';

import logo from '../assets/logo.jpg';

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
    handlePressLogin() {

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
                                keyboardType = 'email-address'
                                returnKeyType = 'next'
                                placeholder = {'Użytkownik'}
                                placeholderTextColor = '#a2aabc'
                                underlineColorAndroid = 'transparent'
                            />
                        </View>
                        <View style={loginRegisterStyles.input}>
                            <TextInput style={loginRegisterStyles.inputField}
                                onChangeText = {(text) => this.setState({password: text})}
                                secureTextEntry = {true}
                                returnKeyType = 'next'
                                placeholder = {'Hasło'}
                                placeholderTextColor = '#a2aabc'
                                underlineColorAndroid = 'transparent'
                            />
                        </View>
                        <TouchableOpacity style={loginRegisterStyles.actionButton} onPress={() => this.handlePressLogin()}>
                                <Text style={loginRegisterStyles.buttonText}> Zaloguj się </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={loginRegisterStyles.linkContainer} 
                        onPress={() => this.props.navigation.navigate("SignUp")}>
                            <Text style={loginRegisterStyles.linkText}>Nie masz jeszcze konta? Zarejestruj się!</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </TouchableWithoutFeedback>
            </Container>
        )
    }
}