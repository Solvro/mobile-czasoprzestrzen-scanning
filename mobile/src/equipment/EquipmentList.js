import React from 'react';
import { View, ScrollView, RefreshControl, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Container, Text, Card, CardItem, Content } from 'native-base';


export default class EquipmentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            equipment: [],
            refreshing: false,
        };
    }

    componentWillMount() {

    }

    generateEquipmentList() {
        // Temporary solution
        categoriesTemp = ['mikrofony', 'głośniki', 'przedłużacze', 'kable'];
        this.setState({categories: categoriesTemp});

        equipmentTemp = [];
        for(let i = 0; i <= 10; i++) {

        }


    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({equipment: []});
        this.generateEquipmentList()
            .then(() => this.setState({refreshing: false}));
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
                    <Content>
                        {this.state.equipment}
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}