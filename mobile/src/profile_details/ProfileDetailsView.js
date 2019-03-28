import React from 'react'
import {Container, Text} from 'native-base';
import {View, Animated, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import DataEditField from '../components/DataEditField';

import SubmitButton from '../components/SubmitButton';
import buttonStyles from '../styles/ButtonStyles.js';
import buttonStrings from '../assets/strings/ButtonStrings.js';

import homeStyles from '../styles/HomeStyles.js';
import profileDetailsStyles from '../styles/ProfileDetailsStyles.js';

import Icon from 'react-native-vector-icons/Ionicons';


export default class ProffileDetailsView extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePress = () => {}

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileDetailsStyles.background}>
                        <DataEditField 
                            title = 'użytkownik'
                            data = 'user123'
                            handlePress = {this.handlePress}
                            icon = 'md-contact'/>
                         <DataEditField 
                            title = 'e-mail'
                            data = 'user123@gmail.com'
                            handlePress = {this.handlePress}
                            icon = 'md-mail'/>
                        <DataEditField 
                            title = 'numer telefonu'
                            data = '756324996'
                            handlePress = {this.handlePress}
                            icon = 'md-call'/>
                    </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}