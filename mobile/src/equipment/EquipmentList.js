import React from 'react';
import { View, ScrollView, RefreshControl, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Container, Text, Card, CardItem, Content } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import equipmentListStyles from '../styles/EquipmentListStyle';

export default class EquipmentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            equipment: [],
            equipmentList: [],
            refreshing: false,
        };
    }

    async componentWillMount() {
        this.getEquipmentList();
        this.generateEquipmentList();
        this.setState({refreshing: false});
    }

    getEquipmentList() {
        // Temporary solution
        categoriesTemp = ['mikrofony', 'głośniki', 'przedłużacze', 'kable'];
        this.setState({categories: categoriesTemp});

        equipmentNames = ['Mikrofon', 'Głośnik', 'Przedłużacz', 'Kabel'];
        numOfItems = categoriesTemp.length;

        equipmentTemp = []

        for(let i = 0; i <= 10; i++) {
            item = Math.floor(Math.random() * (numOfItems - 1));
            equipmentTemp.push(
                {
                    name: equipmentNames[item],
                    category: categoriesTemp[item],
                    isAvaiable: true,
                }
            );
        }

        this.setState({equipment: equipmentTemp});
    }

    generateEquipmentList = () => {
        this.getEquipmentList();
        list = [];

        for(let i = 0; i < this.state.equipment.length; i++) {
            item = this.state.equipment[i];
            key = 'item' + i;

            list.push(this.generateItemCard(item['name'], item['category'], item['isAvaiable'], key));
        }
        this.setState({equipmentList: list});
    }

    generateItemCard = (name, category, isAvaiable, key) => {
        return(
            <Card style={equipmentListStyles.card} key={key}>
                <TouchableOpacity>
                    <CardItem style={equipmentListStyles.cardItem}>
                        <Text style={equipmentListStyles.title}>
                            {name}
                        </Text>
                    </CardItem>
                    <CardItem style={equipmentListStyles.itemInfo}>
                        <Text style={equipmentListStyles.titleText}>
                            Kategoria: 
                        </Text>
                        <Text>
                            {category}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text style={equipmentListStyles.titleText}>
                            Dostępność:
                        </Text>
                        {this.putAvailabilityStatus(isAvaiable)}
                    </CardItem>
                </TouchableOpacity>
            </Card>
        );
    }

    putAvailabilityStatus(isAvaiable) {
        if(isAvaiable) {
            return(
                <Icon name='md-checkmark' style={equipmentListStyles.icon} color={'#3b82c4'}/>
            );
        } else {
            return (
                <Icon name='md-close' style={equipmentListStyles.icon} color={'#3b82c4'}/>
            );
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({equipment: []});
        this.generateEquipmentList();
        this.setState({refreshing: false});
    }

    render() {
        return(
            <Container style={equipmentListStyles.container}>
                <View style={equipmentListStyles.input}>
                    <TextInput style={equipmentListStyles.inputField}
                                        onChangeText = {(text) => console.log(text)}
                                        placeholder = {'Wyszukaj'}
                                        placeholderTextColor = '#a2aabc'
                                        underlineColorAndroid = 'transparent'
                                    />
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this._onRefresh()}
                        />
                    }
                >
                    <Content>
                        {this.state.equipmentList}
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}