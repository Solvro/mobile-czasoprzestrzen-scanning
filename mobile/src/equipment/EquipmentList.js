import React from 'react';
import { Container, Text, Card, CardItem, Content } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemsList from '../components/ItemsList';

import equipmentListStyles from '../styles/EquipmentListStyle';
import logo from '../assets/logo.jpg';

import apiConfig from '../services/api/config';

export default class EquipmentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            items: [],
        };
    }

    async componentWillMount() {
        let response = await this.getItems();
        this.setState({items: response});
        this.setState({isReady: true});
    }

    getItems = async () => {
        let fetchedItems;
        data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiConfig.clientId, 
            }
        }

        await fetch(apiConfig.url + '/api-v1/equipment/', data)
        .then((response) => {this.setState({status: response.status}); return response.json()})
        .then((response) => {
            if(this.state.status === 200) {
                fetchedItems = response;
            } else {
                Alert.alert('You are not authorized!');
            }
        })
        .catch(() => {
            Alert.alert('No connection with server!');
        });

        return fetchedItems;
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {;
            return(
                <Container style={equipmentListStyles.container}>
                   <ItemsList items={this.state.items}/>
                </Container>
            )
        }
    }
}