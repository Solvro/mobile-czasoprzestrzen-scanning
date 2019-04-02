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


export default class ProfileDetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            
            username: null,
            email: null,
            phoneNumber: null,
            street: null,
            postalCode: null,
            city: null,
            nip: null,
            regon: null,

            isPerson: false,
        }
    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileDetailsStyles.background}>
                        <DataEditField
                            label='użytkownik'
                            inputText='Nazwa użytkownika'
                            data='user123'
                            warningAlert='warn'
                            icon='md-contact'
                        />
                         <DataEditField
                            label='e-mail'
                            inputText='Adres e-mail'
                            data='user123@gmail.com'
                            warningAlert='warn'
                            icon='md-mail'
                        />
                         <DataEditField
                            label='numer telefonu'
                            inputText='Numer telefonu'
                            data='864325971'
                            warningAlert='warn'
                            icon='md-call'
                        />
                        {!this.state.isPerson && (
                            <View>
                                <DataEditField
                                    label='ulica i numer'
                                    inputText='Ulica i numer'
                                    data='Sienkiewicza 12'
                                    warningAlert='warn'
                                    icon='md-pin'
                                />
                                <DataEditField
                                    label='kod pocztowy'
                                    inputText='kod pocztowy'
                                    data='59-430'
                                    warningAlert='warn'
                                    icon='md-pin'
                                />
                                <DataEditField
                                    label='miejscowość'
                                    inputText='miejscowość'
                                    data='Wrocław'
                                    warningAlert='warn'
                                    icon='md-pin'
                                />
                                <DataEditField
                                    label='NIP'
                                    inputText='NIP'
                                    data='6846123684'
                                    warningAlert='warn'
                                    icon='md-business'
                                />
                                <DataEditField
                                    label='REGON'
                                    inputText='REGON'
                                    data='1564834131'
                                    warningAlert='warn'
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