import React from 'react'
import {Container} from 'native-base';
import {Alert, View, Animated, TouchableWithoutFeedback, ScrollView} from 'react-native';

import DataEditField from '../components/DataEditField';
import ChangePasswordButton from '../components/ChangePasswordButton';
import profileDetailsStyles from '../styles/ProfileDetailsStyles.js';
import registrationStrings from '../assets/strings/RegistrationStrings.js';
import alertStrings from '../assets/strings/AlertStrings.js';
import {isNip, isRegon, isUsername, isEmail, isPhoneNumber, isPostalCode} from '../validator/DataValidator.js';


import apiConfig from '../services/api/config';
import SubmitButton from '../components/SubmitButton';


export default class ProfileDetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            
            username: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            street: null,
            postalCode: null,
            city: null,
            nip: null,
            regon: null,
            id: null,

            isBusiness: null,
        } 
    }

    async componentWillMount() {
        let response = await this.getData();
        this.setState({data: response});

        this.setState({username: response.username});
        this.setState({firstName: response.first_name});
        this.setState({lastName: response.last_name});
        this.setState({email: response.email});
        this.setState({phoneNumber: response.phone});
        this.setState({street: response.address});
        this.setState({nip: response.business_data});
        this.setState({isBusiness: response.is_business});
        this.setState({id: response.id})


        this.setState({isReady: true});
    }

    getData = async () => {
        let fetchedItems;
        data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            },
            body: JSON.stringify({
                'token': apiConfig.clientId,
            })
        }

        await fetch(apiConfig.url + '/api-v1/verify/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItems = response;
            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });

        return fetchedItems;
    }

    updateData = async (label, newValue) => {
        
        this.setState({email: label})
        let fetchedItems;

        var item = {}
            item [label] = newValue;
            var b = JSON.stringify(item);
            data = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiConfig.clientId, 
                },
                body: b,
            }

        await fetch(apiConfig.url + '/api-v1/client/' + this.state.id + '/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItems = response;
            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });

        return fetchedItems;
    }


    changePassword = async (password, newpassword) => {
        data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            },
            body: JSON.stringify({
                'old_password': password,
                'new_password': newpassword,
            })
        }

        await fetch(apiConfig.url + '/api-v1/change-password/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                Alert.alert(alertStrings.passwordChanged);
            } else if (this.state.status === 401) {
                Alert.alert(alertStrings.incorrectPassword);
            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else
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
                                keyboardType = 'default'
                                label = 'username'
                                updateRequest = {this.updateData}
                                
                            />
                            <DataEditField
                                title={registrationStrings.firstName}
                                data={this.state.firstName}
                                isValidated={false}
                                icon='md-contact'
                                keyboardType = 'default'
                                updateRequest = {this.updateData}
                                label = 'first_name'
                            />
                            <DataEditField
                                title={registrationStrings.lastName}
                                data={this.state.lastName}
                                isValidated={false}
                                icon='md-contact'
                                keyboardType = 'default'
                                updateRequest = {this.updateData}
                                label = 'last_name'
                            />
                            <DataEditField
                                title={registrationStrings.email}
                                data={this.state.email}
                                isValidated={true}
                                validator={isEmail}
                                warningAlert={alertStrings.invalidEmail}
                                icon='md-mail'
                                keyboardType = 'email-address'
                                updateRequest = {this.updateData}
                                label = 'email'
                            />
                            <DataEditField
                                title={registrationStrings.phoneNumber}
                                data={this.state.phoneNumber}
                                isValidated={true}
                                validator={isPhoneNumber}
                                warningAlert={alertStrings.invalidPhoneNumber}
                                icon='md-call'
                                keyboardType = 'phone-pad'
                                updateRequest = {this.updateData}
                                label = 'phone'
                            />
                            {this.state.isBusiness && (
                                <View>
                                    <DataEditField
                                        title={registrationStrings.street}
                                        data={this.state.street}
                                        isValidated={false}
                                        icon='md-pin'
                                        keyboardType = 'default'
                                    />
                                    <DataEditField
                                        title={registrationStrings.postalCode}
                                        data={this.state.postalCode}
                                        isValidated={true}
                                        validator={isPostalCode}
                                        warningAlert={alertStrings.invalidPostalCode}
                                        icon='md-pin'
                                        keyboardType = 'default'
                                    />
                                    <DataEditField
                                        title={registrationStrings.city}
                                        data={this.state.city}
                                        isValidated={false}
                                        icon='md-pin'
                                        keyboardType = 'default'
                                    />
                                    <DataEditField
                                        title={registrationStrings.nip}
                                        data={this.state.nip}
                                        isValidated={true}
                                        validator={isNip}
                                        warningAlert={alertStrings.invalidNIP}
                                        icon='md-business'
                                        keyboardType = 'number-pad'
                                    />
                                    <DataEditField
                                        title={registrationStrings.regon}
                                        data={this.state.regon}
                                        isValidated={true}
                                        validator={isRegon}
                                        warningAlert={alertStrings.invalidRegon}
                                        icon='md-business'
                                        keyboardType = 'number-pad'
                                    />
                                </View>
                            )}
                        </ScrollView>
                        <View style={profileDetailsStyles.buttonContainer}>
                            <ChangePasswordButton
                                updatePassRequest={this.changePassword}
                            />
                        </View>
                       
                    </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}