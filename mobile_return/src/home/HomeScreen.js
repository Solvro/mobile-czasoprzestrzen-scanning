import React from 'react';
import {Container} from 'native-base';
import {View, Animated, TouchableWithoutFeedback, Alert, Text, Image} from 'react-native';
import SubmitButton from '../components/SubmitButton';

import homeStyles from '../styles/HomeStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import logo from '../assets/logo.jpg';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import alertStrings from '../assets/strings/AlertStrings.js';

import apiConfig from '../services/api/config';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = 200;
        this.state = {
            isAuthorized: false,
        };
    }

    componentWillMount = async () => {
        await this.getClientUsername();
        if (this.state.isAuthorized) {
            Alert.alert(alertStrings.authorizationInfo + ' ' + apiConfig.clientUsername);
        }
    }

    getClientUsername = async () => {
        const token = apiConfig.clientId;

        let data = {
            method: 'POST',
            body: JSON.stringify({
               'token': token,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await fetch(apiConfig.url + '/api-v1/verify/', data)
            .then((response) => { this.setState({ status: response.status }); return response.json() })
            .then((response) => {
                if (this.state.status === 200) {
                    apiConfig.clientUsername = response.username;
                    this.setState({isAuthorized: true});
                } else {
                    Alert.alert(alertStrings.noAuthoriatzion);
                }
            })
            .catch(() => {
                Alert.alert(alertStrings.noConnectionWithServer);
            });
    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <View style={homeStyles.background}>
                        <View style={homeStyles.logoContainer}>
                            <Image source={logo} resizeMode='contain'
                                style={[homeStyles.logoStyle,
                                      {height: this.imageHeight}]} />
                            <Text style={homeStyles.title}>
                              Czasoprzestrzeń
                            </Text>
                      </View>
                        
                        <View style={buttonStyles.buttonContainer}>
                        <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('Return')} 
                            buttonText={buttonStrings.returnButton}
                            icon='md-redo' />
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('SignedOut')} 
                            buttonText={buttonStrings.signOutButton}
                            icon='md-log-out' />
                        </View>
                  </View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}