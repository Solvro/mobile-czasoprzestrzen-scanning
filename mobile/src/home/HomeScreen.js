import React from 'react';
import {Container, Text} from 'native-base';
import {View, Animated, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import homeStyles from '../styles/HomeStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import logo from '../assets/logo.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(200);
    }

    render() {
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={homeStyles.background}>
                        <View style={homeStyles.logoContainer}>
                            <Animated.Image source={logo} resizeMode='contain'
                                style={[homeStyles.logoStyle,
                                      {height: this.imageHeight}]} />
                            <Animated.Text style={homeStyles.title}>
                              Czasoprzestrzeń
                            </Animated.Text>
                      </View>
                      <View style={buttonStyles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Rent')}>
                                <LinearGradient colors={['#3b82c4', '#2B69A3', '#1C5182']} style={buttonStyles.actionButton}>
                                    <Icon name="md-add-circle-outline" style={buttonStyles.icons}/>
                                    <View style={buttonStyles.textContainer}>
                                        <Text style={buttonStyles.buttonText}> Wypożycz</Text>
                                    </View >
                                </LinearGradient>  
                            </TouchableOpacity>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Return')}>
                                <LinearGradient colors={['#3b82c4', '#2B69A3', '#1C5182']} style={buttonStyles.actionButton}>
                                    <Icon name="md-remove-circle-outline" style={buttonStyles.icons}/>
                                    <View style={buttonStyles.textContainer}>
                                        <Text style={buttonStyles.buttonText}> Zwróć</Text>
                                    </View >
                                </LinearGradient>  
                            </TouchableOpacity>
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Equipment')}>
                                <LinearGradient colors={['#3b82c4', '#2B69A3', '#1C5182']} style={buttonStyles.actionButton}>
                                    <Icon name="md-list" style={buttonStyles.icons}/>
                                    <View style={buttonStyles.textContainer}>
                                        <Text style={buttonStyles.buttonText}> Lista sprzętu</Text>
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