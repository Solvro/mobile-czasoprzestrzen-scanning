import React from 'react';
import {Container, Text} from 'native-base';
import { View, Animated, TouchableWithoutFeedback} from 'react-native';

import profileStyles from '../styles/ProfileStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import image from '../assets/user-in-a-square.png';

import SubmitButton from '../components/SubmitButton';
import buttonStrings from '../assets/strings/ButtonStrings.js';


export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(160);

        this.state = {
            username: 'user123',
        }
    }

    deleteAccount = () => {

    }

    render() {
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