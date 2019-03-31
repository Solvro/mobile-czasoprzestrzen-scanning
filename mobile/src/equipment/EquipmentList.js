import React from 'react';
import { Container, Text, Card, CardItem, Content } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemsList from '../components/ItemsList';

import equipmentListStyles from '../styles/EquipmentListStyle';
import logo from '../assets/logo.jpg';

export default class EquipmentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isReady: true,
        };
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return(
                <Container style={equipmentListStyles.container}>
                   <ItemsList/>
                </Container>
            )
        }
    }
}