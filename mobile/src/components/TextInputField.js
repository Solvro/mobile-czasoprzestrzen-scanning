import React from 'react';
import {View, TextInput, Animated, Keyboard, TouchableOpacity, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {Container, Text} from 'native-base';
import {LinearGradient} from 'expo';
import DismissKeyboard from 'dismissKeyboard';
import Icon from 'react-native-vector-icons/Ionicons';
import SubmitButton from '../components/SubmitButton';

import loginRegisterStyles from '../styles/LoginRegisterStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';   
import inputFieldsStyles from '../styles/InputFieldsStyles.js';

import logo from '../assets/logo.jpg';

/**
 * 
 */
export default class TextInputField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={inputFieldsStyles.input}>
                <TextInput style={inputFieldsStyles.inputField}
                    onChangeText = {(text) => this.props.setStateHandler(this.props.state, text)}
                    keyboardType = {this.props.keyboardType}
                    returnKeyType = {this.props.returnKeyType}
                    placeholder = {this.props.placeholder}
                    secureTextEntry = {this.props.secureTextEntry}
                    placeholderTextColor = '#a2aabc'
                    underlineColorAndroid = 'transparent'
                />
            </View>
        );
    }
}