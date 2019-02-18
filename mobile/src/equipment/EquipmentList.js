import React from 'react';
import { View, Text, ScrollView, RefreshControl, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Container, Text, Card, CardItem } from 'native-base';


export default class EquipmentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            equipment: [],
        };
    }

    componentWillMount() {

    }

    generateEquipmentList() {
        // Temporary solution
        categoriesTemp = ['mikrofony', 'głośniki', 'przedłużacze', 'kable'];
        this.setState({categories: categoriesTemp});

        equipmentTemp = [];

    }

    onRefresh() {
        console.log('refreshing');
    }

    render() {
        return(
            <Container>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                >


                </ScrollView>
            </Container>
        )
    }
}