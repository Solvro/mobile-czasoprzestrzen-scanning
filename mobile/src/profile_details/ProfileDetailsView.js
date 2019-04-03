import React from 'react'
import {Container} from 'native-base';
import {View, Animated, TouchableWithoutFeedback} from 'react-native';

import DataEditField from '../components/DataEditField';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import profileDetailsStyles from '../styles/ProfileDetailsStyles.js';
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
            firstName: 'Jan',
            lastName: 'Kowalski',
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

    newPasswordRequest() {

    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileDetailsStyles.background}>
                        <ScrollView style={profileDetailsStyles.scrollView}>
                            <DataEditField
                                title={registrationStrings.username}
                                data={this.state.username}
                                isValidated={true}
                                validator={isUsername}
                                warningAlert={alertStrings.usernameToShort}
                                icon='md-contact'
                            />
                            <DataEditField
                                title={registrationStrings.firstName}
                                data={this.state.firstName}
                                isValidated={false}
                                icon='md-contact'
                            />
                            <DataEditField
                                title={registrationStrings.lastName}
                                data={this.state.lastName}
                                isValidated={false}
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
                        </ScrollView>
                        <View style={profileDetailsStyles.buttonContainer}>
                            <SubmitButton
                                handlePress={this.newPasswordRequest}
                                buttonText={buttonStrings.newPasswordButton}
                                icon='md-refresh'
                            />
                        </View>
                       
                    </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}