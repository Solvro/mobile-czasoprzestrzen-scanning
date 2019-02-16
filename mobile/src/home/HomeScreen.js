import React from 'react';
import {Container, Text} from 'native-base';
import {View, Animated, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import homeStyles from '../styles/HomeStyles.js';
import logo from '../assets/logo.jpg';

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
                        <TouchableOpacity style={homeStyles.actionButton} onPress={() => this.props.navigation.navigate('Rent')}>
                            <Text style={homeStyles.buttonText}> Wypożycz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyles.actionButton} onPress={() => this.props.navigation.navigate('Return')}>
                            <Text style={homeStyles.buttonText}> Zwróć</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyles.actionButton} onPress={() => this.props.navigation.navigate('Equipment')}>
                            <Text style={homeStyles.buttonText}> Lista sprzętu</Text>
                        </TouchableOpacity>
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}