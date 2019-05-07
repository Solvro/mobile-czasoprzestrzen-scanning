import React from 'react';
import { Container, Content, Alert } from 'native-base';
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
                fetchedItems = response.slice(Math.max(response.length - 20, 0));
            } else if (this.state.status === 401) {
                Alert.alert(alertStrings.expiredToken);
            } else {
                Alert.alert(alertStrings.unexpectedError);
            }
        })
        .catch(() => {
            Alert.alert(alertStrings.noConnectionWithServer);
        });

        return fetchedItems;
    }

    getTypes = async () => {
        // let data = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + apiConfig.clientId,
        //     }
        // }
    }

    onRefresh = async () => {
        this.setState({ items: [] });
        let response = this.getItems();

        if (response) {
            this.setState({items: response});
        }
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return(
                <Container style={equipmentListStyles.container}>
                 {(!this.state.items || this.state.items.length===0) && (
                    <View style={equipmentListStyles.noDataTextContainer}>
                        <Text style={equipmentListStyles.noDataText}>Brak rekordów</Text>
                    </View>
                )}
                    <ItemsList
                        type='equipment'
                        navigationProps={this.props.navigation}
                        items={this.state.items}
                        onRefresh={this.onRefresh}
                    />
                </Container>
            );
        }
    }
}