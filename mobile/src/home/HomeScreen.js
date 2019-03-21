import React from 'react';
import {Container, Text} from 'native-base';
import {View, Animated, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import SubmitButton from '../components/SubmitButton';

import homeStyles from '../styles/HomeStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import logo from '../assets/logo.jpg';
import buttonStrings from '../assets/strings/ButtonStrings.js';
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
                        <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('Rent')} 
                            buttonText={buttonStrings.rentButton} 
                            icon='md-add-circle-outline'/>
                        </View>
                        
                        <View style={buttonStyles.buttonContainer}>
                        <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('Return')} 
                            buttonText={buttonStrings.returnButton}
                            icon='md-remove-circle-outline' />
                        </View>
                        <View style={buttonStyles.buttonContainer}>
                            <SubmitButton 
                            handlePress={() => this.props.navigation.navigate('Equipment')} 
                            buttonText={buttonStrings.equipmentListButton}
                            icon='md-list' />
                        </View>
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}