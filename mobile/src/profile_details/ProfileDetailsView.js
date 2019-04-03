import React from 'react'
import {Container, Text} from 'native-base';
import {View, Animated, TouchableOpacity,TextInput, TouchableWithoutFeedback} from 'react-native';

import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

import DataEditField from '../components/DataEditField';

import buttonStyles from '../styles/ButtonStyles.js';
import buttonStrings from '../assets/strings/ButtonStrings.js';

import homeStyles from '../styles/HomeStyles.js';
import profileDetailsStyles from '../styles/ProfileDetailsStyles.js';

import Icon from 'react-native-vector-icons/Ionicons';
import TextInputField from '../components/TextInputField';
import InputDialog from '../components/InputDialog';
import loginRegisterStyles from '../styles/LoginRegisterStyles.js';
import { ScrollView } from 'react-native-gesture-handler';
import SubmitButton from '../components/SubmitButton';
import registrationStrings from '../assets/strings/RegistrationStrings.js';
import alertStrings from '../assets/strings/AlertStrings.js';
import {isNip, isRegon, isUsername, isEmail, isPhoneNumber, isPostalCode} from '../validator/DataValidator.js';


export default class ProfileDetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            
            username: 'user123',
            email: 'user123@gmail.com',
            phoneNumber: '864325971',
            street: 'Sienkiewicza 12',
            postalCode: '59-430',
            city: 'Wrocław',
            nip: '6846123684',
            regon: '1564834131',

            isPerson: false,
        } 
    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileDetailsStyles.background}>
                        <DataEditField
                            title={registrationStrings.username}
                            data={this.state.username}
                            isValidated={true}
                            validator={isUsername}
                            warningAlert={alertStrings.usernameToShort}
                            icon='md-contact'
                        />
                         <DataEditField
                            title={registrationStrings.email}
                            data={this.state.email}
                            isValidated={true}
                            validator={isEmail}
                            warningAlert={alertStrings.invalidEmail}
                            icon='md-mail'
                        />
                         <DataEditField
                            title={registrationStrings.phoneNumber}
                            data={this.state.phoneNumber}
                            isValidated={true}
                            validator={isPhoneNumber}
                            warningAlert={alertStrings.invalidPhoneNumber}
                            icon='md-call'
                        />
                        {!this.state.isPerson && (
                            <View>
                                <DataEditField
                                    title={registrationStrings.street}
                                    data={this.state.street}
                                    isValidated={false}
                                    icon='md-pin'
                                />
                                <DataEditField
                                    title={registrationStrings.postalCode}
                                    data={this.state.postalCode}
                                    isValidated={true}
                                    validator={isPostalCode}
                                    warningAlert={alertStrings.invalidPostalCode}
                                    icon='md-pin'
                                />
                                <DataEditField
                                    title={registrationStrings.city}
                                    data={this.state.city}
                                    isValidated={false}
                                    icon='md-pin'
                                />
                                <DataEditField
                                    title={registrationStrings.nip}
                                    data={this.state.nip}
                                    isValidated={true}
                                    validator={isNip}
                                    warningAlert={alertStrings.invalidNIP}
                                    icon='md-business'
                                />
                                <DataEditField
                                    title={registrationStrings.regon}
                                    data={this.state.regon}
                                    isValidated={true}
                                    validator={isRegon}
                                    warningAlert={alertStrings.invalidRegon}
                                    icon='md-business'
                                />
                            </View>
                        )}
                    </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}