import React from 'react';

import { Container, Button, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import itemsListStyles from '../styles/ItemsListStyles';

export default class ItemsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            items: [],
        }
    }

    componentWillMount() {
        this.setState({ isReady: true });
        this.addItems();
    }

    addItems = () => {
        itemsList = []

        for (let i = 0; i < 5; i++) {
            itemsList.push(
                <ListItem key={i}>

                    <Body>
                        <Text style={itemsListStyles.name}>Super mikrofon</Text>
                        <Text note style={itemsListStyles.noteText}>mikrofony</Text>
                    </Body>
                    <Right>
                        <Icon name='md-close' style={[itemsListStyles.icon, itemsListStyles.inaccessibleIcon]} />
                    </Right>
                </ListItem>
            );
        }

        for (let i = 5; i < 10; i++) {
            itemsList.push(
                <ListItem key={i}>
                    <Body>
                        <Text>Super mikrofon</Text>
                        <Text note style={itemsListStyles.noteText}>mikrofony</Text>
                    </Body>
                    <Right>
                        <Icon name='md-checkmark' style={[itemsListStyles.icon, itemsListStyles.availableIcon]} />
                    </Right>
                </ListItem>
            );
        }

        this.setState({ items: itemsList });
    }

    render() {
        return (
            <Content>
                <List>
                    {this.state.items}
                </List>
            </Content>
        );
    }
}