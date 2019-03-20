import React from 'react';

import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {LinearGradient} from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import buttonStyles from '../styles/ButtonStyles.js';   

export default class SubmitButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return(
            <TouchableOpacity onPress={() => this.props.handlePress()}>
                <LinearGradient colors={['#3b82c4', '#2B69A3', '#1C5182']} style={buttonStyles.actionButton}>
                    <Icon name="md-log-in" style={buttonStyles.icons}/>
                    <View style={buttonStyles.textContainer}>
                        <Text style={buttonStyles.buttonText}>{this.props.buttonText}</Text>
                    </View >
                </LinearGradient>  
            </TouchableOpacity>
        );
    }
}