import React from 'react';

import { TextInput, View } from 'react-native';
import { Content, List } from 'native-base';
import SingleListItem from './SingleListItem';
import TypePicker from '../components/TypePicker';
import inputFieldsStyles from '../styles/InputFieldsStyles';
import textStrings from '../assets/strings/TextStrings';

import itemsListStyles from '../styles/ItemsListStyles';
export default class ItemsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            items: [],
            searchedPhrase: null,
            searchedType: null,
        }
    }

    async componentWillMount() {
        this.setState({ searchedPhrase: null });
        await this.addItems();
        this.setState({ isReady: true });
    }

    onSearchedPhraseChange = async (event) => {
        if (event === '') {
            event = null;
        }
        await this.setState({ searchedPhrase: event });
        await this.addItems();
    }

    onTypePickerValueChange = async (value) => {
        if (value === -1) {
            value = null;
        }
        await this.setState({ searchedType: value });
        await this.addItems();
    }

    filter = async () => {
        let filteredItems = [];

        if (this.state.searchedPhrase === null && this.state.searchedType === null) {
            return this.props.items;
        }

        filteredItems = this.filterByPhrase(this.props.items);
        filteredItems = this.filterByType(filteredItems);

        return filteredItems;
    }

    filterByPhrase = (items) => {
        if (this.state.searchedPhrase === null) {
            return items;
        }

        let filteredItems = [];
        let phrase = this.state.searchedPhrase.toLowerCase();

        items.forEach((item) => {
            let itemName = item.name.toLowerCase();
            if (itemName.includes(phrase)) {
                filteredItems.push(item);
            }
        });

        return filteredItems;
    }

    filterByType = (items) => {
        if (this.state.searchedType === null) {
            return items;
        }

        let filteredItems = [];
        items.forEach((item) => {
            if (item.type.id === this.state.searchedType) {
                filteredItems.push(item);
            }
        });

        return filteredItems;
    }

    addItems = async () => {
        let itemsList = []

        let filteredItems = await this.filter();

        filteredItems.forEach((item, index) => {
            itemsList.push(<SingleListItem
                type={this.props.type}
                key={index}
                item={item}
            />);
        });

        this.setState({ items: itemsList });
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return (
                <Content>
                    <View style={inputFieldsStyles.input}>
                        <TextInput style={inputFieldsStyles.inputField}
                            onChangeText={(text) => this.onSearchedPhraseChange(text)}
                            keyboardType='default'
                            returnKeyType='next'
                            placeholder={textStrings.searchingPlaceholder}
                            secureTextEntry={false}
                            placeholderTextColor='#a2aabc'
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={itemsListStyles.typePickerContainer}>
                        <TypePicker onValueChange={this.onTypePickerValueChange} />
                    </View>
                    <List>
                        {this.state.items}
                    </List>
                </Content>
            );
        }
    }
}