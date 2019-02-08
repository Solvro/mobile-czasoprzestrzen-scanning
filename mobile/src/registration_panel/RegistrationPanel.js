import React from 'react';
import {View, TextInput, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {Container, Text} from 'native-base';
import DismissKeyboard from 'dismissKeyboard';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';

import logo from '../assets/logo.jpg';

export default class RegistrationPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            username: null,
            password: null,
        }
    }


    /**
     * Handles login button press action.
     */
    handlePress() {

    }

    render() {
        return(
            <View>
                <Text>Rejestracja</Text>
            </View>
        )
    }
}