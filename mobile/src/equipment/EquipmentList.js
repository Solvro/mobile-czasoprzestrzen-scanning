import React from 'react';
import { View, ScrollView, RefreshControl, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Container, Text, Card, CardItem, Content } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import equipmentListStyles from '../styles/EquipmentListStyle';
import logo from '../assets/logo.jpg';

export default class EquipmentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            equipment: [],
            equipmentList: [],
            refreshing: false,
            isReady: false,
            searchedPhrase: '',
        };
    }

    async componentWillMount() {
        await this.getEquipmentList();
        this.generateEquipmentList();
        this.setState({searchedPhrase: ''});
        this.setState({refreshing: false});
        this.setState({isReady: true});
    }

    search(phrase) {
        console.log(phrase);
        this.setState({searchedPhrase: phrase});
        this.generateEquipmentList();
    }

    getEquipmentList() {
        // Temporary solution
        categoriesTemp = ['mikrofony', 'głośniki', 'przedłużacze', 'kable'];
        this.setState({categories: categoriesTemp});

        equipmentNames = ['Mikrofon', 'Głośnik', 'Przedłużacz', 'Kabel'];
        numOfItems = categoriesTemp.length;

        equipmentTemp = []
        let availability;

        for(let i = 0; i <= 10; i++) {
            item = Math.floor(Math.random() * (numOfItems - 1));
            
            if(Math.random() < 0.5) {
                availability = false;
            } else {
                availability = true;
            }

            equipmentTemp.push(
                {
                    name: equipmentNames[item],
                    category: categoriesTemp[item],
                    isAvaiable: availability,
                }
            );
        }

        this.setState({equipment: equipmentTemp});
    }

    generateEquipmentList = () => {
        list = [];
        showAll = true;

        if(this.state.searchedPhrase != '') {
            showAll = false;
        } 

        for(let i = 0; i < this.state.equipment.length; i++) {
            item = this.state.equipment[i];
            name = item['name'].toLowerCase();
            key = 'item' + i;

            if(showAll) {
                list.push(this.generateItemCard(item['name'], item['category'], item['isAvaiable'], key));
            } else {
                if(name.includes(this.state.searchedPhrase.toLowerCase())) {
                    list.push(this.generateItemCard(item['name'], item['category'], item['isAvaiable'], key));
                }
            }
        }
        this.setState({equipmentList: list});
    }

    generateItemCard = (name, category, isAvaiable, key) => {
        return(
            <Card style={equipmentListStyles.card} key={key}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Item')}>
                    <CardItem header style={equipmentListStyles.cardItem}>
                        <Text style={equipmentListStyles.title}>
                            {name}
                        </Text>
                        {this.putAvailabilityStatus(isAvaiable)}
                    </CardItem>
                    <CardItem style={equipmentListStyles.itemInfo}>
                        <Text style={equipmentListStyles.description}>
                            {category}
                        </Text>
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
        this.getEquipmentList();
        this.generateEquipmentList();
        this.setState({refreshing: false});
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return(
                <Container style={equipmentListStyles.container}>
                    <View style={equipmentListStyles.logoContainer}>
                        <Image source={logo} style={equipmentListStyles.logo}/>
                    </View>
                    <View style={equipmentListStyles.input}>
                        <Icon name='md-search' style={equipmentListStyles.searchIcon} color={'#3b82c4'}/>
                        <TextInput style={equipmentListStyles.inputField}
                                            onChangeText = {(text) => this.search(text)}
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
}