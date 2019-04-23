import React from 'react';

import { TextInput, View } from 'react-native';
import { Content, List } from 'native-base';
import SingleListItem from './SingleListItem';
import inputFieldsStyles from '../styles/InputFieldsStyles';
import textStrings from '../assets/strings/TextStrings';
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
        this.setState({searchedPhrase: null});
        await this.addItems();
        this.setState({ isReady: true });
    }

    onSearchedPhraseChange = async (event) => {
        if (event === '') {
            event = null;
        }
        await this.setState({ searchedPhrase: event });
        console.log('Event: ' + event);
        console.log('Phrase: ' + this.state.searchedPhrase);
        await this.addItems();
    }

    filterByPhrase = () => {
        if(this.state.searchedPhrase === null) {
            return this.props.items;
        }

        let filteredItems = [];
        let phrase = this.state.searchedPhrase.toLowerCase();

        for(let i = 0; i < this.props.items.length; i++) {
            let itemName =  this.props.items[i].name.toLowerCase();
            if (itemName.includes(phrase)) {
                filteredItems.push(this.props.items[i]);
            }
        }

        return filteredItems;
    }

    addItems = async () => {
        itemsList = []

        let filteredItems = await this.filterByPhrase();

        for(let i = 0; i < filteredItems.length; i++) {
            itemsList.push(<SingleListItem
                type={this.props.type}
                key={i}
                item={filteredItems[i]} />);
        }

        this.setState({ items: itemsList });
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading/>
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
                    <List>
                        {this.state.items}
                    </List>
                </Content>
            );
        }
    }
}