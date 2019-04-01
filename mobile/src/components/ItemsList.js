import React from 'react';

import { Container, Button, Header, Content, List, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import SingleListItem from './SingleListItem';

import itemsListStyles from '../styles/ItemsListStyles';

export default class ItemsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            items: [],
        }
    }

    async componentWillMount() {
        await this.addItems();
        this.setState({ isReady: true });
    }

    addItems = async () => {
        itemsList = []

        for(let i = 0; i < this.props.items.length; i++) {
            itemsList.push(<SingleListItem key={i} item={this.props.items[i]}/>);
        }

        this.setState({ items: itemsList });
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading/>
        } else {
            return (
                <Content>
                    <List>
                        {this.state.items}
                    </List>
                </Content>
            );
        }
    }
}