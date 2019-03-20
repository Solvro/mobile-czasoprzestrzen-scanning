import React from 'react';

import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {LinearGradient} from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import buttonStyles from '../styles/ButtonStyles.js';   


/**
 * Props:
 * handlePress - defining behaviour on button click
 * buttonText - text on button
 */
export default class SubmitButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return(
            <TouchableOpacity onPress={() => this.props.handlePress()}>
                <View style={buttonStyles.actionButton}>
                    <Icon name="md-log-in" style={buttonStyles.icons}/>
                    <View style={buttonStyles.textContainer}>
                        <Text style={buttonStyles.buttonText}>{this.props.buttonText}</Text>
                    </View >
                </View>  
            </TouchableOpacity>
        );
    }
}