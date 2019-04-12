import React from 'react';
import {Container, Text} from 'native-base';
import {Alert, View, Animated, TouchableWithoutFeedback} from 'react-native';

import profileStyles from '../styles/ProfileStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import image from '../assets/user-in-a-square.png';

import SubmitButton from '../components/SubmitButton';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import apiConfig from '../services/api/config';
import alertStrings from '../assets/strings/AlertStrings.js';


export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(160);

        this.state = {
            isReady: false,
            username: null,
        }
    }

    deleteAccount = () => {

    }

    async componentWillMount() {
        let response = await this.getData();
        this.setState({username: response.username});

        this.setState({isReady: true});
    }

    getData = async () => {
        let fetchedData;
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
                fetchedData = response;
            } else {
                Alert.alert(alertStrings.noAuthoriatzion);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });

        return fetchedData;
    }


    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileStyles.background}>
                        <View style={profileStyles.imageContainer}>
                            <Animated.Image 
                                source={image} resizeMode='contain'
                                style={[{height: this.imageHeight}]} />
                        </View>
                        <Text style={profileStyles.text}>
                            {this.state.username}
                        </Text>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton
                                handlePress={() => this.props.navigation.navigate('ProfileDetails')}
                                buttonText={buttonStrings.profileDetailsButton}
                                icon= 'md-person'/>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton
                                handlePress={() => {this.deleteAccount}}
                                buttonText={buttonStrings.deleteAccountButton}
                                icon= 'md-trash'/>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton
                                handlePress={() => this.props.navigation.navigate('SignedOut')}
                                buttonText={buttonStrings.signOutButton}
                                icon= 'md-log-out'/>
                        </View>
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}