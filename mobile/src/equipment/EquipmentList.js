import React from 'react';
import { Container } from 'native-base';
import ItemsList from '../components/ItemsList';

import equipmentListStyles from '../styles/EquipmentListStyle';
import alertStrings from '../assets/strings/AlertStrings';

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
                Alert.alert(alertStrings.noAuthoriatzion);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });

        return fetchedItems;
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {;
            return(
                <Container style={equipmentListStyles.container}>
                    <ItemsList
                        type='equipment'
                        navigationProps={this.props.navigation}
                        items={this.state.items} />
                </Container>
            )
        }
    }
}