import React from 'react';
import {Container, Text} from 'native-base';
import {Alert, View, Animated, TouchableWithoutFeedback} from 'react-native';

import itemDetailsStyles from '../styles/ItemDetailsStyles.js';
import buttonStyles from '../styles/ButtonStyles.js';
import image from '../assets/photo-camera.png';

import SubmitButton from '../components/SubmitButton';
import buttonStrings from '../assets/strings/ButtonStrings.js';
import apiConfig from '../services/api/config';
import alertStrings from '../assets/strings/AlertStrings.js';


export default class ItemDetailsView extends React.Component {

    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(200);

        this.state = {
            isReady: false,
            
            name: null,
            description: null,
            available: null,
            type: null,
        } 
    }

    async componentWillMount() {
        let response = await this.getItemDetails();

        this.setState({name: response.name});
        this.setState({description: response.description});
        this.setState({available: response.available});
        //this.setState({available: false});
        //this.setState({type: response.type});
        this.setState({type: 'mikrofon'});

        this.setState({isReady: true});
    }



    getItemDetails = async () => {
        let fetchedItem;

            data = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiConfig.clientId, 
                },
            }

        await fetch(apiConfig.url + '/api-v1/equipment/' + 1 + '/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItem = response;
            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });

        return fetchedItem;
    }


    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else
        return(
            <Container>
                <TouchableWithoutFeedback>
                    <Animated.View style={itemDetailsStyles.background}>
                        <View style={itemDetailsStyles.imageContainer}>
                            <Animated.Image 
                                source={image} resizeMode='contain'
                                style={[{height: this.imageHeight}]} />
                        </View>
                        <View style={itemDetailsStyles.textContainer}>
                            <Text style={itemDetailsStyles.typeText}>
                                {this.state.type}
                            </Text>
                            <Text style={itemDetailsStyles.nameText}>
                                {this.state.name}
                            </Text>
                            {this.state.available && (
                                 <Text style={itemDetailsStyles.availableText}>
                                    • dostępny
                                </Text>
                            )}
                            {!this.state.available && (
                                <Text style={itemDetailsStyles.unavailableText}>
                                    • niedostępny
                                </Text>
                            )}
                            <View style={itemDetailsStyles.desciptionContainer}>
                                <Text style={itemDetailsStyles.desciptionTitle}>
                                    Opis przedmiotu
                                </Text>
                                <Text style={itemDetailsStyles.desciptionText}>
                                    {this.state.description }
                                </Text>
                            </View>
                        </View>
                       
                    
                  </Animated.View>
              </TouchableWithoutFeedback>
          </Container>
        )
    }
}