import React from 'react';
import {Container, Text} from 'native-base';
import {Image, View, Animated, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import profileStyles from '../styles/ProfileStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import image from '../assets/user-in-a-square.png';


import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo';


export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(160);
    }

    editData() {

    }

    deleteAccount() {

    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={profileStyles.background}>
                        <Animated.Image source={image} resizeMode='contain'
                             style={[profileStyles.imageStyle, {height: this.imageHeight}]} />
                        <View style={profileStyles.userDataContainer1}>
                            <View style={profileStyles.userDataContainer}>
                                <View>
                                    <Icon name="md-contact" style={profileStyles.icons}/>
                                </View>
                                <View>
                                    <Text style={profileStyles.typeText}>
                                        użytkownik
                                    </Text>
                                    <Text style={profileStyles.dataText}>
                                        user12345
                                    </Text>
                                </View>
                            </View>
                            <View style={profileStyles.userDataContainer}>
                                <View>
                                    <Icon name="md-mail" style={profileStyles.icons}/>
                                </View>
                                <View>
                                    <Text style={profileStyles.typeText}>
                                        e-mail
                                    </Text>
                                    <Text style={profileStyles.dataText}>
                                        user12345@gmail.com
                                    </Text>
                                </View>
                            </View>
                            <View style={profileStyles.userDataContainer}>
                                <View>
                                    <Icon name="md-call" style={profileStyles.icons}/>
                                </View>
                                <View>
                                    <Text style={profileStyles.typeText}>
                                        numer telefonu
                                    </Text>
                                    <Text style={profileStyles.dataText}>
                                        756314585
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.editData()}>
                                <LinearGradient colors={['#3b82c4', '#2B69A3', '#1C5182']} style={buttonStyles.actionButton}>
                                    <Icon name="md-create" style={buttonStyles.icons}/>
                                    <View style={buttonStyles.textContainer}>
                                        <Text style={buttonStyles.buttonText}> Zmień dane</Text>
                                    </View >
                                </LinearGradient>  
                            </TouchableOpacity>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.deleteAccount()}>
                                <LinearGradient colors={['#3b82c4', '#2B69A3', '#1C5182']} style={buttonStyles.actionButton}>
                                    <Icon name="md-trash" style={buttonStyles.icons}/>
                                    <View style={buttonStyles.textContainer}>
                                        <Text style={buttonStyles.buttonText}> Usuń konto</Text>
                                    </View >
                                </LinearGradient>  
                            </TouchableOpacity>
                        </View>
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}